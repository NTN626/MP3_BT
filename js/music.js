const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "PLAY_MUSIC";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      id: 0,
      name: "Con đường bình phàm",
      singer: "Hoa Thần Vũ",
      path: "https://tainhacmienphi.biz/get/song/api/13557",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      id: 1,
      name: "Love Is A Beautiful Pain",
      singer: "Endless Tears; Nakamura Maiko",
      path: "https://tainhacmienphi.biz/get/song/api/5717",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    },
    {
      id: 2,
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "https://aredir.nixcdn.com/NhacCuaTui1024/Trai-HaiLuu-7123774.mp3?st=ChPg4CFOC8zTffB-Q7EhFg&e=1648017523",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      id: 3,
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=DYblkMoctCRBgIZaIFHjvQ&e=1648028493",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      id: 4,
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://f9-stream.nixcdn.com/NhacCuaTui1026/HatChoMinhEmNghe-Minh-7131116.mp3?st=4frQFchWNV6SX2Mt1dXOVQ&e=1648028515",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      id: 5,
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://aredir.nixcdn.com/NhacCuaTui999/HoaNoKhongMau1-HoaiLam-6281704.mp3?st=rFkAL7jDz0znNb2DdmPjJw&e=1648028549",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
    },
    {
      id: 6,
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://aredir.nixcdn.com/NhacCuaTui999/HoaNoKhongMau1-HoaiLam-6281704.mp3?st=rFkAL7jDz0znNb2DdmPjJw&e=1648028549",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
    },
    {
      id: 7,
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://aredir.nixcdn.com/NhacCuaTui999/HoaNoKhongMau1-HoaiLam-6281704.mp3?st=rFkAL7jDz0znNb2DdmPjJw&e=1648028549",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
    },
    {
      id: 8,
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://aredir.nixcdn.com/NhacCuaTui999/HoaNoKhongMau1-HoaiLam-6281704.mp3?st=rFkAL7jDz0znNb2DdmPjJw&e=1648028549",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `   <div id="${song.id}" class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
      <div
        class="thumb"
        style="
          background-image: url('${song.image}');
        "
      ></div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`;
    });
    playList.innerHTML = htmls.join("");
  },
  defineProperty: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvent: function () {
    //lưu this(app) để sử dụng trong xử lý cái function event
    const _this = this;

    //xử lý CD quay/ dừng
    const cdThumbAnimation = cdThumb.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000, //10s
        iterations: Infinity,
      }
    );
    cdThumbAnimation.pause();
    //xử lý phóng to/ thu nhỏ CD
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newWidth = cdWidth - scrollTop;

      cd.style.width = newWidth >= 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };
    //xử lý khi play
    playBtn.onclick = function () {
      if (!_this.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    };

    // khi song được played
    audio.onplay = function () {
      player.classList.add("playing");
      _this.isPlaying = true;
      cdThumbAnimation.play();
    };
    // khi song bi pause
    audio.onpause = function () {
      player.classList.remove("playing");
      _this.isPlaying = false;
      cdThumbAnimation.pause();
    };
    //khi tien do bài hát thay dổi
    audio.ontimeupdate = function () {
      if (!isNaN(audio.duration)) {
        const currentPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = currentPercent;
      }
    };

    progress.onmousedown = function (ele) {
      audio.pause();
    };
    progress.onmouseup = function (ele) {
      audio.play();
    };

    //xử khi tua
    progress.oninput = function (element) {
      //tổng số giầy:  audio.duration
      //phầm tram: progress.value
      //currentPercent = currentTime/ duration *100
      const seekTime = (audio.duration / 100) * element.target.value;
      if (seekTime) {
        audio.currentTime = seekTime;
      }
    };
    //khi nextSong
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }

      progress.value = 0;
      audio.play();
    };
    //khi prevSong
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      progress.value = 0;
      audio.play();
    };
    //xử lý bật tắt random
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      this.classList.toggle("active", _this.isRandom);
      _this.setConfig("isRandom", _this.isRandom);
    };
    // Xử lý lặp lại song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      this.classList.toggle("active", _this.isRepeat);
      _this.setConfig("isRepeat", _this.isRepeat);
    };

    //xử lý next khi hết bài
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    //lang nghe hanh vi play list
    playList.onclick = function (ele) {
      const songElement = ele.target.closest(".song:not(.active)");
      const optionElement = ele.target.closest(".option");
      if (songElement && !optionElement) {
        _this.currentIndex = songElement.dataset.index;
        _this.loadCurrentSong();
        audio.play();
      }
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    console.log(newIndex);
    this.loadCurrentSong();
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;

    repeatBtn.classList.toggle("active", this.isRepeat);
    randomBtn.classList.toggle("active", this.isRandom);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    //xử lý active
    $(".song.active").classList?.remove("active");
    $$(".song")[this.currentIndex].classList?.add("active");
    this.scrollToActive();
  },
  scrollToActive: function () {
    setTimeout(function () {
      const songActive = $(".song.active");
      if (songActive.dataset.index <= 6) {
        songActive.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        songActive.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  },
  start: function () {
    //load cau hình
    this.loadConfig();
    //render playlist
    this.render();
    //đĩnh nghĩa cái thuộc tính cho object
    this.defineProperty();
    //Lắng nghe/ xử lý Dom Event
    this.handleEvent();
    //tai thong tin bài hat dau tien vao UI khi chay
    this.loadCurrentSong();
  },
};
app.start();
function conLog(mess) {
  console.log(mess);
}
