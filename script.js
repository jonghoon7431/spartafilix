import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUqeionlIBAH398Fv5-gDOgAgmQC-YsII",
  authDomain: "sparta-555d7.firebaseapp.com",
  projectId: "sparta-555d7",
  storageBucket: "sparta-555d7.appspot.com",
  messagingSenderId: "256729956475",
  appId: "1:256729956475:web:4a5dcf946afbcb04f262de",
  measurementId: "G-23XFJ49EX3",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$("#postingbtn").click(async function () {
  let image = $("#image").val();
  let title = $("#title").val();
  let star = $("#star").val();
  let coment = $("#coment").val();

  let doc = {
    "image": image,
    "title": title,
    "star": star,
    "coment": coment,
  };
  await addDoc(collection(db, "movies"), doc);
  alert("저장 완료");
  window.location.reload();
});

let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let nowTemp = data["temp"];

    $("#nowTemper").text(nowTemp);
  });

let docs = await getDocs(collection(db, "movies"));
docs.forEach((doc) => {
  let row = doc.data();

  let image = row["image"];
  let title = row["title"];
  let star = row["star"];
  let coment = row["coment"];

  let temp_html = `
          <div class="col">
            <div class="card h-100">
              <img
                src="${image}"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${star}</p>
              </div>
              <div class="card-footer">
                <small class="text-body-secondary">${coment}</small>
              </div>
            </div>
          </div>`;
  $("#card").append(temp_html);
});

$("#savebtn").click(async function () {
  $("#postingbox").empty();

  $("#postingbox").append(` <div class="form-floating mb-3">
    <input type="email" class="form-control" id="image" placeholder="영화 이미지 주소" />
    <label for="floatingInput">영화 이미지 주소</label>
  </div>
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="title" placeholder="영화 제목" />
    <label for="floatingInput">영화 제목</label>
    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">별점</label>
      <select class="form-select" id="star">
        <option selected>별점 선택</option>
        <option value="⭐">⭐</option>
        <option value="⭐⭐">⭐⭐</option>
        <option value="⭐⭐⭐">⭐⭐⭐</option>
        <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
        <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
      </select>
    </div>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="coment" placeholder="추천 이유" />
      <label for="floatingInput">추천 이유</label>
    </div>
    <button id="postingbtn" type="button" class="btn btn-danger">등록</button>
  </div>`);

  $("#postingbox").toggle();
  $("#postingbox").style.display = "inline";
});
