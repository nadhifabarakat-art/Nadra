import { useState } from "react";
import offer from "../pages/offer.js";
import "./style/sidebar.css";

const OfferPost = () => {
  const [posts, setPosts] = useState(offer);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    name: "",
    sessions: "",
    oldPrice: "",
    newPrice: "",
    type: "",
  });
  const [showForm, setShowForm] = useState(false);

  const deletePost = (id) => {
    if (window.confirm("متأكدة تحذفي؟")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const startEdit = (post) => {
    setEditingPost(post.id);
    setForm({
      name: post.name,
      sessions: post.sessions,
      oldPrice: post.oldPrice,
      newPrice: post.newPrice,
      type: post.type,
    });
    setShowForm(true);
  };

  const savePost = () => {
    setPosts(posts.map((p) => (p.id === editingPost ? { ...p, ...form } : p)));
    setShowForm(false);
    setEditingPost(null);
    setForm({ name: "", sessions: "", oldPrice: "", newPrice: "", type: "" });
  };

  return (
    <div className="beauty-container">
      <h2>Offer Posts</h2>

      {showForm && (
        <div className="beauty-form">
          <input
            className="beauty-input"
            placeholder="العنوان"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="المحتوى المختصر"
            value={form.sessions}
            onChange={(e) => setForm({ ...form, sessions: e.target.value })}
          />
          <textarea
            className="beauty-input"
            placeholder="المحتوى الكامل"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="السعر"
            value={form.newPrice}
            onChange={(e) => setForm({ ...form, newPrice: e.target.value })}
          />
          <div className="beauty-form-buttons">
            <button className="btn-save" onClick={savePost}>
              حفظ
            </button>
            <button className="btn-cancel" onClick={() => setShowForm(false)}>
              إلغاء
            </button>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="beauty-card">
          <h3>{post.name}</h3>
          <p className="short-content">{post.sessions}</p>
          <p>{post.oldPrice}</p>
          <p className="price">💰 {post.newPrice} €</p>
          <div className="beauty-card-buttons">
            <button className="btn-edit" onClick={() => startEdit(post)}>
              {" "}
              تعديل
            </button>
            <button className="btn-delete" onClick={() => deletePost(post.id)}>
              {" "}
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferPost;
