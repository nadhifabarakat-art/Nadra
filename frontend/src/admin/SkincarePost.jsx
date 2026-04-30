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
  E;
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
      <h2>Skincare Posts</h2>

      {showForm && (
        <div className="beauty-form">
          <input
            placeholder="الاسم"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="المدة"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />

          <textarea
            placeholder="المحتوى"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <input
            type="number"
            placeholder="السعر"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="القسم"
            value={form.section}
            onChange={(e) => setForm({ ...form, section: e.target.value })}
          />

          <input
            placeholder="الفئة"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
        إضافة خدمة
      </button>

      <div>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post._id}>
              <h3>{post.name}</h3>
              <p>{post.content}</p>
              <p>{post.duration}</p>
              <p>{post.price} €</p>
              <p>{post.section}</p>
              <p>{post.category}</p>

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

export default SkincarePost;
