import { useState, useEffect } from "react";
import axios from "axios";
import "./style/sidebar.css";

const LaserPost = () => {
  const [posts, setPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    shortContent: "",
    content: "",
    price: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);

  const getPosts = async () => {
    try {
      const res = await axios.get("https://nadra-kr80.onrender.com/laser/");

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
        "https://nadra-kr80.onrender.com/laser/deleted",
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
        await axios.delete(`https://nadra-kr80.onrender.com/laser/${id}`);
        setPosts(posts.filter((p) => p._id !== id));
        getDeletedPosts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const restorePost = async (id) => {
    try {
      await axios.put(`https://nadra-kr80.onrender.com/laser/restore/${id}`);

      setDeletedPosts(deletedPosts.filter((p) => p._id !== id));
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (post) => {
    setEditingPost(post._id);
    setForm({
      title: post.title || "",
      shortContent: post.shortContent || "",
      content: post.content || "",
      price: post.price || "",
      image: post.image || "",
    });
    setShowForm(true);
  };

  const savePost = async () => {
    try {
      await axios.put(`https://nadra-kr80.onrender.com/laser/${editingPost}`, {
        ...form,
        price: Number(form.price),
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
      await axios.post("https://nadra-kr80.onrender.com/laser/", {
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
            placeholder="العنوان"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="وصف مختصر"
            value={form.shortContent}
            onChange={(e) => setForm({ ...form, shortContent: e.target.value })}
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
            placeholder="الصورة"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
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
              <h3>{post.title}</h3>
              <p>{post.shortContent}</p>
              <p>{post.content}</p>
              <p>{post.price} €</p>

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
                <h3>{post.title}</h3>
                <p>{post.shortContent}</p>
                <p>{post.price} €</p>

                <button onClick={() => restorePost(post._id)}>استرجاع</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LaserPost;
