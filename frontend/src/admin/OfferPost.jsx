import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const OfferPost = () => {
  const [posts, setPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sessions: "",
    oldPrice: "",
    newPrice: "",
    type: "",
  });

  const getPosts = async () => {
    try {
      const res = await axios.get("https://nadra-kr80.onrender.com/offers/");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || res.data.result || [];

      setPosts(data);
    } catch (err) {
      console.log(err);
      setPosts([]);
    }
  };

  const getDeletedPosts = async () => {
    try {
      const res = await axios.get(
        "https://nadra-kr80.onrender.com/offers/deleted",
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || res.data.result || [];

      setDeletedPosts(data);
    } catch (err) {
      console.log(err);
      setDeletedPosts([]);
    }
  };

  useEffect(() => {
    getPosts();
    getDeletedPosts();
  }, []);

  const deletePost = async (id) => {
    if (window.confirm("متأكدة تحذفي؟")) {
      try {
        await axios.delete(`https://nadra-kr80.onrender.com/offers/${id}`);

        setPosts(posts.filter((p) => p._id !== id));
        getDeletedPosts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const restorePost = async (id) => {
    try {
      await axios.put(`https://nadra-kr80.onrender.com/offers/restore/${id}`);

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
      await axios.put(`https://nadra-kr80.onrender.com/offers/${editingPost}`, {
        ...form,
        sessions: form.sessions.split(",").map((s) => s.trim()),
        oldPrice: Number(form.oldPrice),
        newPrice: Number(form.newPrice),
      });

      await getPosts();
      setShowForm(false);
      setEditingPost(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      const res = await axios.post("https://nadra-kr80.onrender.com/offers/", {
        ...form,
        sessions: form.sessions.split(",").map((s) => s.trim()),
        oldPrice: Number(form.oldPrice),
        newPrice: Number(form.newPrice),
      });

      await getPosts();
      setShowForm(false);
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
            placeholder="الاسم"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="الجلسات (comma)"
            value={form.sessions}
            onChange={(e) => setForm({ ...form, sessions: e.target.value })}
          />

          <input
            type="number"
            placeholder="السعر القديم"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder="السعر الجديد"
            value={form.newPrice}
            onChange={(e) => setForm({ ...form, newPrice: e.target.value })}
          />

          <input
            placeholder="النوع"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <button onClick={editingPost ? savePost : addPost}>حفظ</button>

          <button onClick={() => setShowForm(false)}>إلغاء</button>
        </div>
      )}

      <button
        onClick={() => {
          setEditingPost(null);
          setShowForm(true);
        }}
      >
        إضافة عرض
      </button>

      <div>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post._id}>
              <h3>{post.name}</h3>

              <ul>
                {post.sessions?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <p>
                <del>{post.oldPrice} €</del>
              </p>

              <p>{post.newPrice} €</p>

              <p>{post.type}</p>

              <button onClick={() => startEdit(post)}>تعديل</button>

              <button onClick={() => deletePost(post._id)}>حذف</button>
            </div>
          ))}
      </div>

      <button onClick={() => setShowDeleted(!showDeleted)}>
        {showDeleted ? "إخفاء" : "عرض المحذوفات"}
      </button>

      {showDeleted && (
        <div>
          {deletedPosts.length === 0 && <p>لا يوجد محذوفات</p>}

          {Array.isArray(deletedPosts) &&
            deletedPosts.map((post) => (
              <div key={post._id} style={{ opacity: 0.5 }}>
                <h3>{post.name}</h3>

                <button onClick={() => restorePost(post._id)}>استرجاع</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OfferPost;
