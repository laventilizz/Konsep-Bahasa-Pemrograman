/* Fungsi POMODORO */

document.addEventListener('DOMContentLoaded', () => {
  let timerInterval;
  let timerTime = 1500; // Default 25 menit
  let isPaused = false;
  let currentMode = "Pomodoro"; // Default mode
  const timerDisplay = document.getElementById('timer-display');
  const controlButton = document.getElementById('control-timer');
  const resetButton = document.getElementById('reset');
  const Pomodoro = document.querySelector(".pmdr");
  const shortBreakSpan = document.querySelector(".sb");
  const longBreakSpan = document.querySelector(".lb");

  // Fungsi untuk memperbarui tampilan timer
  function updateTimerDisplay() {
      const minutes = Math.floor(timerTime / 60);
      const seconds = timerTime % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Fungsi untuk mengatur timer
  function setTimer(minutes, mode) {
      timerTime = minutes * 60;
      currentMode = mode;
      updateTimerDisplay();
  }

  // Event listener untuk menu
  Pomodoro.addEventListener("click", () => {
      setTimer(25, "Pomodoro");
      Pomodoro.style.color = "black"
      shortBreakSpan.style.color = "grey"
      longBreakSpan.style.color = "grey"
  });

  shortBreakSpan.addEventListener("click", () => {
      setTimer(5, "Short Break");
      Pomodoro.style.color = "grey"
      shortBreakSpan.style.color = "black"
      longBreakSpan.style.color = "grey"
  });

  longBreakSpan.addEventListener("click", () => {
      setTimer(10, "Long Break");
      Pomodoro.style.color = "grey"
      shortBreakSpan.style.color = "grey"
      longBreakSpan.style.color = "black"
  });

  // Fungsi untuk memulai timer
  function startTimer() {
      timerInterval = setInterval(() => {
          if (timerTime > 0) {
              timerTime--;
              updateTimerDisplay();
          } else {
              clearInterval(timerInterval);
              timerInterval = null;
              // Reset timer sesuai mode
              if (currentMode === "Pomodoro") {
                setTimer(25, "Pomodoro");
            } else if (currentMode === "Short Break") {
                setTimer(5, "Short Break");
            } else if (currentMode === "Long Break") {
                setTimer(10, "Long Break");
            }

              // Reset tombol ke Start
              controlButton.textContent = "start";
              controlButton.style.backgroundColor = '#FBFF4A';
              controlButton.style.color = 'black';
              timerAudio.play();
              alert("Time's up!"); 
          }
          
      }, 1000);
  }

  // Event listener untuk tombol Start/Pause/Resume
  controlButton.addEventListener('click', () => {
      if (!timerInterval) {
          // Jika timer belum berjalan atau dilanjutkan
          controlButton.textContent = "pause";
          controlButton.style.backgroundColor = '#9747FF';
          controlButton.style.color = 'white';
          isPaused = false;
          startTimer();
      } else {
          // Jika tombol ditekan saat timer berjalan
          clearInterval(timerInterval);
          timerInterval = null;
          controlButton.textContent = "resume";
          controlButton.style.backgroundColor = '#9747FF';
          controlButton.style.color = 'white';
          isPaused = true;
      }
  });

  // Event listener untuk tombol Reset
  resetButton.addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
      isPaused = false;

      // Reset sesuai mode saat ini
      if (currentMode === "Pomodoro") {
          setTimer(25, "Pomodoro");
      } else if (currentMode === "Short Break") {
          setTimer(5, "Short Break");
      } else if (currentMode === "Long Break") {
          setTimer(10, "Long Break");
      }

      controlButton.textContent = "start";
      controlButton.style.backgroundColor = '#FBFF4A';
      controlButton.style.color = 'black';
  });

  // Inisialisasi tampilan timer
  updateTimerDisplay();
});



/* Fungsi TO DO LIST */
document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');

    // Load tasks dari Local Storage saat halaman dimuat
    loadTasks();

    // Fungsi menambahkan task baru
    function addTask(taskText, completed = false) {
        const listItem = document.createElement('li');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        if (completed) {
            listItem.classList.add('completed');
        }
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            saveTasks();
        });

        // Task Text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Tombol Edit
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit your task:', taskSpan.textContent);
            if (newText) {
                taskSpan.textContent = newText;
                saveTasks(); 
            }
        });

        // Tombol Delete
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            saveTasks(); 
        });

        // Menyusun item list
        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);
        saveTasks(); 
    }

    // Fungsi menyimpan tasks ke Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach((listItem) => {
            const taskText = listItem.querySelector('span').textContent;
            const completed = listItem.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text: taskText, completed: completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fungsi memuat tasks dari Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => addTask(task.text, task.completed));
    }

    // Event listener tombol Add
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = ''; 
        }
    });

    // Tambahkan task menggunakan tombol Enter
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });
});



/* FUNGSI SPOTIFY */
document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const spotifyLinkInput = document.getElementById("spotify-link");
    const playerContainer = document.getElementById("player-container");
  
    playButton.addEventListener("click", () => {
      const userInput = spotifyLinkInput.value.trim();
  
      if (userInput.includes("open.spotify.com")) {
        const embedLink = convertToEmbedLink(userInput);
  
        // Bersihkan player lama dan tambahkan player baru
        playerContainer.innerHTML = `
          <iframe 
            style="border-radius:12px" 
            src="${embedLink}" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
          </iframe>
        `;
      } else {
        alert("Masukkan link Spotify yang valid!");
      }
    });
  
    // Fungsi mengubah link Spotify menjadi link embed
    function convertToEmbedLink(link) {
      const baseEmbedURL = "https://open.spotify.com/embed/";
      return link.replace("open.spotify.com/", "open.spotify.com/embed/");
    }
  });

  //Fungsi agar track spotify dapat diplay full
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = '[BQCs0FsxIwHzMiSHv6o1VN0YJiq0q1Y8r32mBUao1mYazNLYHhSFFrDjn-8fDED9gTEbMQ_ejFM6gUdJQJlGy3GZqY0UkhnXGAinuplO5ToVHIsJ7zRB33fa4IM3ktpfLA9qhxJx00b2CrYk8SxnSOqRp64b9G_NKh3-MQoQT8s8-mRsM5vgDcgfwbPWFYOXGWGNMoq2KIpPzQv0USJ4Bw96ghwpKBOnM53m]';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.connect();
}



/* FUNGSI MUSIC */
// Mendapatkan elemen-elemen audio dan checkbox
const audio1 = document.getElementById('audio1');
const audio1Checkbox = document.getElementById('audio1Checkbox');
const audio2 = document.getElementById('audio2');
const audio2Checkbox = document.getElementById('audio2Checkbox');
const audio3 = document.getElementById('audio3');
const audio3Checkbox = document.getElementById('audio3Checkbox');

// Fungsi untuk memulai dan mengulang audio sesuai checkbox
function toggleAudioPlayback(audioElement, checkboxElement) {
  checkboxElement.addEventListener('change', () => {
    if (checkboxElement.checked) {
      audioElement.play();
      audioElement.loop = true; // Mengatur agar audio mengulang otomatis
    } else {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset posisi audio ke awal
    }
  });
}

// Menambahkan event listener untuk audio 1 dan audio 2
toggleAudioPlayback(audio1, audio1Checkbox);
toggleAudioPlayback(audio2, audio2Checkbox);
toggleAudioPlayback(audio3, audio3Checkbox);
