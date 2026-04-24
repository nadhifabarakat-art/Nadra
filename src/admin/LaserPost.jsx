import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const LaserPost = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    shortContent: "",
    content: "",
    price: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/laser/");
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
        await axios.delete(`http://localhost:3000/laser/${id}`);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const startEdit = (post) => {
    setEditingPost(post._id);
    setForm({
      title: post.title || "",
      shortContent: post.shortContent || "",
      content: post.content || "",
      price: post.price || "",
    });
    setShowForm(true);
  };

  const savePost = async () => {
    try {
      await axios.put(`http://localhost:3000/laser/${editingPost}`, {
        ...form,
        price: Number(form.price),
      });
      setPosts(
        posts.map((p) => (p._id === editingPost ? { ...p, ...form } : p)),
      );
      setShowForm(false);
      setEditingPost(null);
      setForm({
        title: "",
        shortContent: "",
        content: "",
        price: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      const res = await axios.post("http://localhost:3000/laser/", {
        ...form,
        price: Number(form.price),
      });
      setPosts([...posts, res.data.laser]);
      setShowForm(false);
      setForm({
        title: "",
        shortContent: "",
        content: "",
        price: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="beauty-container">
      <h2>Laser Posts</h2>

      {showForm && (
        <div className="beauty-form">
          <input
            className="beauty-input"
            placeholder="العنوان"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="وصف مختصر"
            value={form.shortContent}
            onChange={(e) => setForm({ ...form, shortContent: e.target.value })}
          />
          <textarea
            className="beauty-input"
            placeholder="المحتوى الكامل"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder=""
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
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
            <h3>{post.title}</h3>

            <p className="short-content">{post.shortContent}</p>
            <p className="content">{post.content}</p>
            <p className="price">{post.price} €</p>
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

export default LaserPost;
