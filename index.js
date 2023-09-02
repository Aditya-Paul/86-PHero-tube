// Blog page
const goBlog = () =>{
    window.location.href = "blog.html"
}

// Display Category

const get_category= async()=>{
    //fetch
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    console.log(data.data)
    const category_Container = document.getElementById('category_holder')
    data.data.forEach((category)=>{
    //get every category by for eaach
    const div = document.createElement('div')
    div.innerHTML = `<button class="btn bg-[#25252526] text-black hover:text-white hover:bg-[#FF1F3D] text-base font-medium " onclick="show_category('${category.category_id}')">${category.category}</button> `
    category_Container.appendChild(div)
    })
}

const show_category = async (category_Id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_Id}`)
    const data = await res.json()
    const get_id_array = data.data
    console.log("ad",data.data)
    // For which option has category
    const display_card_holder = document.getElementById('display_card_holder')
    display_card_holder.innerHTML= ""
    // For which option has no category
    const display_no_card_holder = document.getElementById('no_card_holder')
    display_no_card_holder.innerHTML= ""
    if(get_id_array.length === 0){
        console.log(get_id_array.length)
        const no_category_div = document.createElement('div')
        no_category_div.innerHTML=`<div class="flex items-center justify-center ">
                                    <div class="flex flex-col items-center justify-center mt-24">
                                        <img src="./Icon.png" alt="">
                                        <div>
                                        <h1 class="text-4xl font-bold text-black text-center">
                                            Oops!! Sorry, There is no 
                                            <br>content here
                                        </h1>
                                        </div>
                                    </div>
                                </div>`
        display_no_card_holder.appendChild(no_category_div)                        
    }
    else{
        get_id_array.forEach((Element)=>{
            console.log(Element)
            const get_time = time_convert(Element.others.posted_date)
            const category_div = document.createElement('div')
            category_div.innerHTML=`<div class="mt-8 flex items-center justify-center">
                                        <div class="card bg-base-100 shadow-xl relative">
                                            <div class=" ">
                                            <img class="h-[200px] w-[300px] rounded-lg " src=${Element.thumbnail} />
                                            </div>

                                            <div class="card-body flex flex-row">

                                                <div class=" flex items-center justify-center ">
                                                <img class="h-10 w-10 rounded-full" src=${Element.authors[0].profile_picture} alt="">
                                                </div>

                                                <div class="">
                                                <h2 class="card-title text-base font-bold text-black">${Element.title}</h2>
                                                    <div class="flex gap-2">
                                                        <h6 class="text-sm font-normal text-gray-400">${Element.authors[0].profile_name}</h6>
                                                        <img class="w-5 h-5" src="${Element.authors[0].verified ==='' || Element.authors[0].verified === false? 'white.png':'verified.png'}"alt="">
                                                    </div>
                                                <p class="text-sm font-normal text-gray-400">${Element.others.views}</p>
                                                </div>
                                                
                                            </div>

                                            <div class="bg-black absolute left-[10rem] top-36 p-1">
                                                <p class="text-white ">${get_time}</p>
                                            </div>
                                        </div>
                                    </div>`
        display_card_holder.appendChild(category_div)
        })
    }
    
}
show_category('1000')
get_category()


function time_convert(value){
    if(value === ""){
        return "";
    }
    else{
        const get_min = value / 60;
        const remainder_min = value % 60;
        const get_hr = get_min /60;
        const remainder_hr = get_min % 60
        const result = Math.floor(get_hr) + ' hr ' + Math.floor(remainder_hr) +' min ago'
        return result
        
    }
}
