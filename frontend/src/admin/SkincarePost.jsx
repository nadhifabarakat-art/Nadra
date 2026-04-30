import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const SkincarePost = () => {
  const [posts, setPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    duration: "",
    content: "",
    price: "",
    section: "",
    category: "",
  });

  const getPosts = async () => {
    try {
      const res = await axios.get("https://nadra-kr80.onrender.com/skincare/");

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
        "https://nadra-kr80.onrender.com/skincare/deleted",
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
        await axios.delete(`https://nadra-kr80.onrender.com/skincare/${id}`);

        setPosts(posts.filter((p) => p._id !== id));
        getDeletedPosts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const restorePost = async (id) => {
    try {
      await axios.put(`https://nadra-kr80.onrender.com/skincare/restore/${id}`);

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
      duration: post.duration || "",
      content: post.content || "",
      price: post.price || "",
      section: post.section || "",
      category: post.category || "",
    });
    setShowForm(true);
  };

  const savePost = async () => {
    try {
      await axios.put(
        `https://nadra-kr80.onrender.com/skincare/${editingPost}`,
        {
          ...form,
          price: Number(form.price),
        },
      );

      await getPosts();
      setShowForm(false);
      setEditingPost(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      await axios.post("https://nadra-kr80.onrender.com/skincare/", {
        ...form,
        price: Number(form.price),
      });

      await getPosts();
      setShowForm(false);
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
            placeholder="المحتوى"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            className="beauty-input"
            type="number"
            placeholder="السعر"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="beauty-input"
            placeholder="الصورة"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <button
            className="btn-edit"
            onClick={editingPost ? savePost : addPost}
          >
            حفظ
          </button>
          <button className="btn-cancel" onClick={() => setShowForm(false)}>
            إلغاء
          </button>
        </div>
      )}
      <button
        className="btn-edit"
        onClick={() => {
          setEditingPost(null);
          setShowForm(true);
        }}
      >
        إضافة خدمة
      </button>
      <div>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post._id} className="beauty-card">
              <h3>{post.title}</h3>
              <p className="short-content">{post.shortContent}</p>
              <p>{post.content}</p>
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
      <button className="btn-edit" onClick={() => setShowDeleted(!showDeleted)}>
        {showDeleted ? "إخفاء" : "عرض المحذوفات"}
      </button>
      {showDeleted && (
        <div>
          {deletedPosts.length === 0 && <p>لا يوجد محذوفات</p>}
          {Array.isArray(deletedPosts) &&
            deletedPosts.map((post) => (
              <div
                key={post._id}
                className="beauty-card"
                style={{ opacity: 0.5 }}
              >
                <h3>{post.title}</h3>
                <button
                  className="btn-edit"
                  onClick={() => restorePost(post._id)}
                >
                  استرجاع
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SkincarePost;
