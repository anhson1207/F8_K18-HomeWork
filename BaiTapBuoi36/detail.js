const API = "https://dummyjson.com/posts";
const params=new URLSearchParams(window.location.search);
const id=params.get("id");
const backBtn=document.getElementById("backBtn");
backBtn.addEventListener("click",goBack);
 //get post detail
async function getPostDetail() {
    try {
        const res = await axios.get(`${API}/${id}`);
        const post = res.data;
        document.getElementById("postTitle").innerHTML = `<h3>${post.title}</h3>
        <p>${post.body}</p>`;
    } catch (error) {
        console.log(error);
    }
}
//go back
function goBack() {
    window.history.back();
}
getPostDetail();