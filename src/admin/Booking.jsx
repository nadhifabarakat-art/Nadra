import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const OfferPost = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    name: "",
    sessions: "",
    oldPrice: "",
    newPrice: "",
    type: "skincare",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/offers/");
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
        await axios.delete(`http://localhost:3000/offers/${id}`);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const startEdit = (post) => {
    setEditingPost(post._id);
    setForm({
      name: post.name,
      sessions: post.sessions.join(", "),
      oldPrice: post.oldPrice,
      newPrice: post.newPrice,
      type: post.type,
    });
    setShowForm(true);
  };

  const savePost = async () => {
    try {
      await axios.put(`http://localhost:3000/offers/${editingPost}`, {
        ...form,
        sessions: form.sessions.split(",").map((s) => s.trim()),
        oldPrice: Number(form.oldPrice),
        newPrice: Number(form.newPrice),
      });
      setPosts(
        posts.map((p) => (p._id === editingPost ? { ...p, ...form } : p)),
      );
      setShowForm(false);
      setEditingPost(null);
      setForm({
        name: "",
        sessions: "",
        oldPrice: "",
        newPrice: "",
        type: "skincare",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      const res = await axios.post("http://localhost:3000/offers/", {
        ...form,
        sessions: form.sessions.split(",").map((s) => s.trim()),
        oldPrice: Number(form.oldPrice),
        newPrice: Number(form.newPrice),
      });
      setPosts([...posts, res.data]);
      setShowForm(false);
      setForm({
        name: "",
        sessions: "",
        oldPrice: "",
        newPrice: "",
        type: "skincare",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="beauty-container">
      <h2>Offer Posts</h2>
      <button
        className="btn-save"
        onClick={() => {
          setEditingPost(null);
          setShowForm(true);
        }}
      >
        + إضافة جديد
      </button>

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
            placeholder="الجلسات (مفصولة بفاصلة)"
            value={form.sessions}
            onChange={(e) => setForm({ ...form, sessions: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="السعر القديم"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="السعر الجديد"
            value={form.newPrice}
            onChange={(e) => setForm({ ...form, newPrice: e.target.value })}
          />
          <select
            className="beauty-input"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="skincare">Skincare</option>
            <option value="laser">Laser</option>
          </select>
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

      {posts.map((post) => (
        <div key={post._id} className="beauty-card">
          <h3>{post.name}</h3>
          <p>🎯 {post.type}</p>
          <p>
            💰 {post.oldPrice} € ← {post.newPrice} €
          </p>
          <div className="beauty-card-buttons">
            <button className="btn-edit" onClick={() => startEdit(post)}>
              تعديل
            </button>
            <button className="btn-delete" onClick={() => deletePost(post._id)}>
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferPost;
