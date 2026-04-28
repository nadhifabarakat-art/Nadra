import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const OfferPost = () => {
  const [posts, setPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    name: "",
    sessions: "",
    oldPrice: "",
    newPrice: "",
    type: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPosts();
    getDeletedPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/offers/");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDeletedPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/offers/deleted");
      setDeletedPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("متأكدة تحذفي؟")) {
      try {
        await axios.delete(`http://localhost:3000/offers/${id}`);
        setPosts(posts.filter((p) => p._id !== id));
        getDeletedPosts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const restorePost = async (id) => {
    try {
      await axios.put(`http://localhost:3000/offers/restore/${id}`);
      setDeletedPosts(deletedPosts.filter((p) => p._id !== id));
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (post) => {
    setEditingPost(post._id);
    setForm({
      name: post.name || "",
      sessions: post.sessions ? post.sessions.join(", ") : "",
      oldPrice: post.oldPrice || "",
      newPrice: post.newPrice || "",
      type: post.type || "",
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
      setForm({ name: "", sessions: "", oldPrice: "", newPrice: "", type: "" });
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
      setPosts([...posts, res.data.offer]);
      setShowForm(false);
      setForm({ name: "", sessions: "", oldPrice: "", newPrice: "", type: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="beauty-container">
      <h2>Offer Posts</h2>

      {showForm && (
        <div className="beauty-form">
          <input
            className="beauty-input"
            placeholder="الاسم"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {/* الجلسات مفصولة بفاصلة */}
          <input
            className="beauty-input"
            placeholder="الجلسات (مفصولة بفاصلة)"
            value={form.sessions}
            onChange={(e) => setForm({ ...form, sessions: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="السعر القديم"
            type="number"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="السعر الجديد"
            type="number"
            value={form.newPrice}
            onChange={(e) => setForm({ ...form, newPrice: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="النوع"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
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

      <button
        className="btn-add"
        onClick={() => {
          setEditingPost(null);
          setForm({
            name: "",
            sessions: "",
            oldPrice: "",
            newPrice: "",
            type: "",
          });
          setShowForm(true);
        }}
      >
        + إضافة عرض
      </button>

      <div className="beauty-cards-list">
        {posts.map((post) => (
          <div key={post._id} className="beauty-card">
            <h3>{post.name}</h3>
            <p>الجلسات:</p>
            <ul>
              {post.sessions?.map((s, index) => (
                <li key={index}>{s}</li>
              ))}
            </ul>
            <p>
              السعر القديم:{" "}
              <span style={{ textDecoration: "line-through" }}>
                {post.oldPrice} €
              </span>
            </p>
            <p className="price">السعر الجديد: {post.newPrice} €</p>
            <p>{post.type}</p>
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

      <button
        className="btn-cancel"
        onClick={() => setShowDeleted(!showDeleted)}
      >
        {showDeleted ? "إخفاء المحذوفات" : "عرض المحذوفات"}
      </button>

      {showDeleted && (
        <div className="beauty-cards-list">
          <h3>المحذوفات</h3>
          {deletedPosts.length === 0 && <p>لا يوجد عناصر محذوفة</p>}
          {deletedPosts.map((post) => (
            <div
              key={post._id}
              className="beauty-card"
              style={{ opacity: 0.6 }}
            >
              <h3>{post.name}</h3>
              <ul>
                {post.sessions?.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>
              <p>
                السعر القديم:{" "}
                <span style={{ textDecoration: "line-through" }}>
                  {post.oldPrice} €
                </span>
              </p>
              <p className="price">السعر الجديد: {post.newPrice} €</p>
              <div className="beauty-card-buttons">
                <button
                  className="btn-edit"
                  onClick={() => restorePost(post._id)}
                >
                  استرجاع ↩
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferPost;
