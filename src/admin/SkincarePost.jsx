import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const SkincarePost = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    section: "",
    category: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/skincare/");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    if (window.confirm("متأكدة تحذفي؟")) {
      try {
        await axios.delete(`http://localhost:3000/skincare/${id}`);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const startEdit = (post) => {
    setEditingPost(post._id);
    setForm({
      name: post.name || "",
      duration: post.duration || "",
      price: post.price || "",
      section: post.section || "",
      category: post.category || "",
    });
    setShowForm(true);
  };

  const savePost = async () => {
    try {
      await axios.put(`http://localhost:3000/skincare/${editingPost}`, {
        ...form,
        price: Number(form.price),
      });
      setPosts(
        posts.map((p) => (p._id === editingPost ? { ...p, ...form } : p)),
      );
      setShowForm(false);
      setEditingPost(null);
      setForm({ name: "", duration: "", price: "", section: "", category: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      const res = await axios.post("http://localhost:3000/skincare/", {
        ...form,
        price: Number(form.price),
      });
      setPosts([...posts, res.data.skincare]);
      setShowForm(false);
      setForm({ name: "", duration: "", price: "", section: "", category: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="beauty-container">
      <h2>Skincare Posts</h2>

      {showForm && (
        <div className="beauty-form">
          <input
            className="beauty-input"
            placeholder="الاسم"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="المدة"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="السعر"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="القسم"
            value={form.section}
            onChange={(e) => setForm({ ...form, section: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="الفئة"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <div className="beauty-form-buttons">
            <button
              className="btn-save"
              onClick={editingPost ? savePost : addPost}
            >
              حفظ
            </button>
            <button className="btn-cancel" onClick={() => setShowForm(false)}>
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="beauty-cards-list">
        {posts.map((post) => (
          <div key={post._id} className="beauty-card">
            <h3>{post.name}</h3>
            <p className="duration">{post.duration}</p>
            <p className="price">{post.price} €</p>
            <p className="section">{post.section}</p>
            <p className="category">{post.category}</p>
            <div className="beauty-card-buttons">
              <button className="btn-edit" onClick={() => startEdit(post)}>
                تعديل
              </button>
              <button
                className="btn-delete"
                onClick={() => deletePost(post._id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkincarePost;
