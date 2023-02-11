import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogsSection from "../components/BlogsSection";
import Spinner from "../components/Spinner";
import Tags from "../components/Tags";
import { db } from "../firebase";

export default function Blogs({ setActive, user }) {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  // getting the blogs Data from the firebase by using use State and snapshot method and sending it to the blogsection.js
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("blogs");

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <h2>Trending</h2>
          <div className="col-md-8">
            <BlogsSection
              blogs={blogs}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          <div className="col-md-3">
            <Tags tags={tags}/>
            <h2>Most popular</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
