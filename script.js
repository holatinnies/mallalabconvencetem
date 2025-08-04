script.js
const malla = [
  {
    nombre: "1° Semestre",
    ramos: [
      { nombre: "Matemáticas I", id: "mate1", prerreq: [] },
      { nombre: "Química General", id: "quim1", prerreq: [] },
      { nombre: "Introducción a la carrera", id: "intro", prerreq: [] }
    ]
  },
  {
    nombre: "2° Semestre",
    ramos: [
      { nombre: "Matemáticas II", id: "mate2", prerreq: ["mate1"] },
      { nombre: "Química Orgánica", id: "quim2", prerreq: ["quim1"] }
    ]
  }
  // Agrega los otros semestres aquí...
];

let completados = JSON.parse(localStorage.getItem("ramosCompletados") || "[]");

function renderMalla() {
  const contenedor = document.getElementById("semestres");
  contenedor.innerHTML = "";

  malla.forEach((sem, index) => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${sem.nombre}</h2>`;

    sem.ramos.forEach(ramo => {
      const btn = document.createElement("div");
      btn.className = "ramo";
      btn.textContent = ramo.nombre;

      const prereqCumplido = ramo.prerreq.every(id => completados.includes(id));

      if (completados.includes(ramo.id)) {
        btn.classList.add("completado");
      } else if (!prereqCumplido) {
        btn.classList.add("bloqueado");
      }

      btn.onclick = () => {
        if (!prereqCumplido) return;

        if (completados.includes(ramo.id)) {
          completados = completados.filter(id => id !== ramo.id);
        } else {
          completados.push(ramo.id);
        }

        localStorage.setItem("ramosCompletados", JSON.stringify(completados));
        renderMalla();
      };

      div.appendChild(btn);
    });

    contenedor.appendChild(div);
  });
}

renderMalla();
