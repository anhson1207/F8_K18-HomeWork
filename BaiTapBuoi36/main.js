const API = "https://dummyjson.com/posts";
const postList = document.getElementById("postList");
const addPostBtn = document.getElementById("addPost");

//get post
async function getPosts() {
    try {
        const res = await axios.get(API);
        renderPosts(res.data.posts);
    } catch (error) {
        console.log(error);
    }
}

//render post
function renderPosts(posts) {
    postList.innerHTML = "";
    posts.forEach((post) => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${post.title}
        <button onclick="viewDetail(${post.id})">Chi tiết</button>
        <button onclick="editPost(${post.id}, '${post.title}')">Sửa</button>
        <button onclick="deletePost(${post.id})">Xóa</button>
        `;
        postList.appendChild(li);
    });
}
//view detail
function viewDetail(id) {
    window.location.href = `detail.html?id=${id}`;
}
//add post
async function addPost() {
    const title = prompt("Nhập tiêu đề bài viết:");
    if (!title) return;
    try {
        await axios.post(API + "/add", { title: title, userId: 1 });
        alert("Thêm bài viết thành công!");
        getPosts();
    } catch (error) {
        alert("Thêm bài viết thất bại!");
    }
}
//edit post
async function editPost(id, currentTitle) {
    const newTitle = prompt("Sửa tiêu đề bài viết:", currentTitle);
    if (!newTitle) return;
    try {
        await axios.put(`${API}/${id}`, { title: newTitle });
        alert("Sửa bài viết thành công!");
        getPosts();
    } catch (error) {
        alert("Sửa bài viết thất bại!");
    }
}
//delete post
async function deletePost(id) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa bài viết này?");
    if (!confirmDelete) return;
    try {
        await axios.delete(`${API}/${id}`);
        alert("Xóa bài viết thành công!");
        getPosts();
    } catch (error) {
        alert("Xóa bài viết thất bại!");
    }
}
//add post
addPostBtn.addEventListener("click", addPost);
getPosts();
