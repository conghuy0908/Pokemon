class Pokemon{
    constructor(){
        this.limit = 100
        this.offset = 0
        this.SetOff = 100
        this.Next = ''
        this.Previous = ''
        this.List = []
        this.pokemonList = document.getElementById("Pokemonlist");
        this.preBtn = document.getElementById("pre-btn");
        this.nextBtn = document.getElementById("next-btn");
    }
    async getData(limit, offset){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
            params: {
                limit,
                offset
            }
        })
        .then(res => res)
        .catch(err => {
            console.log(err)
            return []
        })
        return response 
    }
    displayPokemonList(){
        let htmls = '';
        this.List.forEach((pokemonItem,i) => {
            htmls += `
            <tr>
                <td>${i + 1}</td>
                <td>${pokemonItem.name}</td>
                <td><a href="${pokemonItem.url}">Click</a></td>
            </tr>
            `
        })
        this.pokemonList.innerHTML = htmls;
    }
    handlePaginations(button){
        let url = '';
         if(button == this.nextBtn){
               url = this.Next
               this.SetOff = Math.abs(this.SetOff)
         }else if(button == this.preBtn){
                url = this.Previous
                this.SetOff= -Math.abs(this.SetOff)
        } 
        if(url){
            button.disabled = false
            this.offset += this.SetOff
            this.getData(this.limit,this.offset).then(res => this.handleDataFromAPI(res))
        } else {
            button.disabled = true
        }

    }
    handleEvent(){
        this.nextBtn.onclick = (e) => {this.handlePaginations(e.target)}
        this.preBtn.onclick = (e) => {this.handlePaginations(e.target)}
    }
    handleDataFromAPI(res){
        let {next, previous,results} = res.data
        this.Next = next
        this.Previous = previous
        this.List = results
        this.displayPokemonList()
    }
    init() {
        this.getData(this.limit,this.offset).then(res => this.handleDataFromAPI(res))
        this.handleEvent()
        this.handleButton()
    }
}
const pokemon = new Pokemon()
pokemon.init()