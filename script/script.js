//função (event.preventDefault()) inibi que a página se atualize no formulário, assim o formulário não será enviado
document.querySelector(".busca").addEventListener('submit', async(event)=>{
event.preventDefault()
let input = document.querySelector("#searchInput").value
document.querySelector(".resultado").style.display = 'none'
document.querySelector(".mascote").style.display = "none"

    if (input !== ''){
        mostraraviso ("carregando")
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9cffd38ea43bbf2bc472c8cfcba06120&units=metric&lang=pt_br`;
        let resultados = await fetch(url)
        let json = await resultados.json()
        if (json.cod === 200){
            informacoes({
                nome: json.name,
                pais: json.sys.country,
                temperatura: Math.round(json.main.temp), // Arredonda o valor da temperatura
                icon: json.weather[0].icon,
                ventoVelocidade:json.wind.speed,
                VentoAngulo:json.wind.deg
            });
        }else{
        mostraraviso ("Não encontramos Sua Cidade")

        }
    } else{
        alert("digite o nome da sua cidade")
    }
})


function mostraraviso(msm){
    document.querySelector(".aviso").innerHTML = msm;
}
function informacoes(json){
    mostraraviso('')
    document.querySelector(".resultado").style.display = 'block'
    document.querySelector(".titulo").innerHTML = `${json.nome},${json.pais}`
    document.querySelector(".tempInfo").innerHTML = `${json.temperatura}<sup>ºC</sup>`
    document.querySelector(".ventoInfo").innerHTML = `${json.ventoVelocidade}<span>km/h</span>`
    document.querySelector(".temp img").setAttribute('src',`http://openweathermap.org/img/wn/${json.icon}@2x.png`)
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.VentoAngulo-90}deg)`
    if (json.temperatura > 24){
        document.querySelector(".mascote img").src = "./styles/imagens/foguinho.png"
        document.querySelector(".mascote").style.display = "block"
        document.querySelector(".clima").textContent = "Seu clima está Escaldante"

    }if( json.temperatura <18){
        document.querySelector(".mascote img").src = "./styles/imagens/gelinho.png"
        document.querySelector(".mascote").style.display = "block"
        document.querySelector(".clima").textContent = "Seu clima está Congelante"

    }



}