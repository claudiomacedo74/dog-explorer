const botaoBuscar = document.getElementById("botao-buscar");
const campoRaca = document.getElementById("campo-raca");
const resultado = document.getElementById("resultado");

const API_KEY = "live_X9FQZEOJjzr6I2wUjlQXQtLXa4gafZq86gvEPuwFx2wCTVd8hJIGGutULvUQiB42";

botaoBuscar.addEventListener("click", buscarRaca);

async function buscarRaca() {

    const raca = campoRaca.value.trim();

    if (raca === "") {
        resultado.innerHTML = `
            <h2>Digite o nome de uma raça.</h2>
        `;
        return;
    }

    resultado.innerHTML = `
        <h2>🔎 Buscando informações da raça...</h2>
    `;

    try {

        const resposta = await fetch(
            `https://api.thedogapi.com/v1/breeds/search?q=${raca}`,
            {
                headers: {
                    "x-api-key": API_KEY
                }
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro na API");
        }

        const dados = await resposta.json();

        if (dados.length === 0) {

            resultado.innerHTML = `
                <h2>❌ Nenhuma raça encontrada. Verifique o nome digitado e tente novamente.</h2>
            `;

            return;
        }

       const cachorro = dados[0];
       const traducoes = {
    "Eager to Please": "Deseja agradar",
    "eager to please": "Deseja agradar",
    "Stubborn": "Teimoso",
    "Strong": "Forte",
    "Bold": "Ousado",
    "Independent": "Independente",
    "Smart": "Esperto",
    "Patient": "Paciente",
    "Curious": "Curioso",
    "Lively": "Animado",
    "Reserved": "Reservado",
    "Watchful": "Vigilante",
    "Dignified": "Digno",
    "Reliable": "Confiável",
    "Devoted": "Dedicado",
    "Courageous": "Corajoso",
    "Friendly": "Amigável",
    "Active": "Ativo",
    "Gentle": "Gentil",
    "Intelligent": "Inteligente",
    "Loyal": "Leal",
    "Outgoing": "Extrovertido",
    "Confident": "Confiante",
    "Docile": "Dócil",
    "Responsive": "Obediente",
    "Kind": "Bondoso",
    "Alert": "Alerta",
    "Fearless": "Corajoso",
    "Energetic": "Energético",
    "Playful": "Brincalhão",
    "Calm": "Calmo",
    "Affectionate": "Carinhoso",
    "Protective": "Protetor",
    "Courageous": "Corajoso",
    "Trainable": "Fácil de treinar",
    "Hardworking": "Trabalhador",
    "Adaptable": "Adaptável",
    "Charming": "Encantador"
};

const temperamento = cachorro.temperament
    ? cachorro.temperament
        .split(", ")
        .map(item => {
            const chave = Object.keys(traducoes).find(
                key => key.toLowerCase() === item.toLowerCase()
            );
            return chave ? traducoes[chave] : item;
        })
        .join(", ")
    : "Não informado";

const peso = cachorro.weight.metric
    .replace("Male", "Macho")
    .replace("Female", "Fêmea");

const altura = cachorro.height.metric
    .replace("Male", "Macho")
    .replace("Female", "Fêmea");

const grupos = {
    "Sporting": "Esportivo",
    "Working": "Trabalho",
    "Hound": "Caça",
    "Herding": "Pastoreio",
    "Toy": "Pequeno Porte",
    "Terrier": "Terrier",
    "Non-Sporting": "Não Esportivo",
    "Mixed": "Misto"
};

const grupo = grupos[cachorro.breed_group] || "Não informado";
       const imagemResposta = await fetch(
    `https://api.thedogapi.com/v1/images/${cachorro.reference_image_id}`,
    {
        headers: {
            "x-api-key": API_KEY
        }
    }
);

const imagem = await imagemResposta.json();

const foto = imagem.url
    ? imagem.url
    : "https://via.placeholder.com/400x300?text=Sem+Imagem";

resultado.innerHTML = `

<img src="${foto}" alt="${cachorro.name}">

<h2>${cachorro.name}</h2>

<div class="informacoes">

    <div class="card">

        <h3>⚖️ Peso</h3>

        <p>${peso}kg</p>

    </div>

    <div class="card">

        <h3>📏 Altura</h3>

        <p>${altura}cm</p>

    </div>

    <div class="card">

        <h3>❤️ Temperamento</h3>

        <p>${temperamento}</p>

    </div>

    <div class="card">

        <h3>⏳ Vida</h3>

        <p>${cachorro.life_span} anos </p>

    </div>

    <div class="card">

        <h3>🏷️ Grupo</h3>

        <p>${grupo}</p>

    </div>

    <div class="card">

        <h3>🐾 Origem</h3>

        <p>${cachorro.origin || "Não informado"}</p>

    </div>

</div>

`;


    }

    catch (erro) {

        resultado.innerHTML = `
            <h2>Erro ao consultar a API.</h2>
        `;

        console.error(erro);

    }
}
