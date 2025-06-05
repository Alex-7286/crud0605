let players = JSON.parse(localStorage.getItem("kboPlayers")) || [
  { name: "이정후", team: "키움 히어로즈", position: "외야수" },
  { name: "양의지", team: "두산 베어스", position: "포수" },
  { name: "김하성", team: "KT 위즈", position: "내야수" },
  { name: "최정", team: "SSG 랜더스", position: "내야수" },
  { name: "구창모", team: "NC 다이노스", position: "투수" },
  { name: "박건우", team: "NC 다이노스", position: "외야수" },
  { name: "문성주", team: "LG 트윈스", position: "외야수" },
  { name: "강백호", team: "KT 위즈", position: "지명타자" },
  { name: "김광현", team: "SSG 랜더스", position: "투수" }
];

window.onload = function () {
  renderPlayers(players);
};

function renderPlayers(list) {
  const container = document.getElementById("playerList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>검색 결과가 없습니다.</p>";
    return;
  }

  list.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
      <strong>${player.name}</strong> - ${player.team} / ${player.position}
      <button onclick="editPlayer(${index})" style="margin-left:10px;">수정</button>
      <button onclick="deletePlayer(${index})" style="margin-left:5px; background-color:#e74c3c;">삭제</button>
    `;
    container.appendChild(div);
  });
}

function searchPlayers() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = players.filter(player =>
    player.name.toLowerCase().includes(keyword) ||
    player.team.toLowerCase().includes(keyword) ||
    player.position.toLowerCase().includes(keyword)
  );
  renderPlayers(filtered);
}

function addPlayer() {
  const name = document.getElementById("newName").value.trim();
  const team = document.getElementById("newTeam").value;
  const position = document.getElementById("newPosition").value;

  if (!name || !team || !position) {
    alert("모든 항목을 선택/입력해주세요.");
    return;
  }

  const newPlayer = { name, team, position };
  players.push(newPlayer);
  localStorage.setItem("kboPlayers", JSON.stringify(players));
  renderPlayers(players);

  // 초기화
  document.getElementById("newName").value = "";
  document.getElementById("newTeam").value = "";
  document.getElementById("newPosition").value = "";
}

function deletePlayer(index) {
  if (confirm("정말 삭제하시겠습니까?")) {
    players.splice(index, 1);
    localStorage.setItem("kboPlayers", JSON.stringify(players));
    renderPlayers(players);
  }
}

let editingIndex = null;

function editPlayer(index) {
  editingIndex = index;
  const player = players[index];

  document.getElementById("editName").value = player.name;
  document.getElementById("editTeam").value = player.team;
  document.getElementById("editPosition").value = player.position;

  document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
  editingIndex = null;
}

function saveEdit() {
  const newName = document.getElementById("editName").value.trim();
  const newTeam = document.getElementById("editTeam").value.trim();
  const newPosition = document.getElementById("editPosition").value.trim();

  if (!newName || !newTeam || !newPosition) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  players[editingIndex] = {
    name: newName,
    team: newTeam,
    position: newPosition
  };

  localStorage.setItem("kboPlayers", JSON.stringify(players));
  renderPlayers(players);
  closeModal();
}

