document.addEventListener('DOMContentLoaded', function() 
{

    const input = document.getElementById('input');
    const image_dsplay = document.getElementById('display-images-block');
    const submit=document.getElementById("submit_button");
    const Bars_click =document.getElementById('Bars')
    const Close_Bar = document.getElementById('close')
    const Nav_ele = document.getElementsByClassName('nav')[0]
    Bars_click.addEventListener('click', ()=>
        {
            Nav_ele.classList.toggle('active')
            console.log(Nav_ele)
            
        })
    Close_Bar.addEventListener('click' ,()=>
    {
        {
            Nav_ele.classList.remove('active')
        }

    })
    
    image_dsplay.src="https://covers.openlibrary.org/b/id/9269962-L.jpg"

    //function to get the image data
    const image_insertion=(result)=>
        {
            image_dsplay.innerHTML = '';
            for(let i=0 ; i<result.data.docs.length;i++)
            {
               
               //get image array 
                const doc = result.data.docs[i]; 
                if(doc && doc.cover_i)
                {
                    console.log(doc.cover_i)
                    
                const coverId = doc.cover_i;
               

                const bookDiv = document.createElement('div');

                //for getting amazon id 

                
                
                //creating empty achor making a link when ever i click these link will direct 
                const bookLink = document.createElement('a');
               
                bookLink.href = `bookDetails.html?coverId=${coverId}&title=${encodeURIComponent(doc.title)}&author=${encodeURIComponent(doc.author_name ? doc.author_name.join(', ') : 'Unknown')}&publishYear=${doc.first_publish_year || 'Unknown'}&author_image=${encodeURIComponent(doc.author_key)}&publish_place=${encodeURIComponent(doc.publish_place)}&publisher=${encodeURIComponent(doc.publisher)}&languages=${encodeURIComponent(doc.language)}&reading_count=${encodeURIComponent(doc.readinglog_count)}&subject=${encodeURIComponent(doc.subject)}`;

                bookLink.target="_blank";  // opening in new page 
                

                //title;
                const title = document.createElement('h3');
                title.textContent = doc.title|| 'No Title Available'; 
                   
                //author
                const author = document.createElement('p');
                 author.textContent = doc.author_name ? `Author: ${doc.author_name.join(', ')}` : 'Author: Unknown';


                //publish_date

                const pubDate = document.createElement('p');
                pubDate.textContent = doc.first_publish_year ? `Published: ${doc.first_publish_year}` : 'Published: Unknown';


                //image 

                const img = document.createElement('img')
                img.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
              
              
                bookLink.appendChild(img)
                bookDiv.appendChild(bookLink);
                bookDiv.appendChild(title);
                bookDiv.appendChild(author);
                bookDiv.appendChild(pubDate);

                image_dsplay.appendChild(bookDiv);

                }
      
            /*for single image insertion 
                const coverId=result.data.docs[i].cover_i;
                //const img = document.createElement('img');
                img.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
                image_dsplay.append(img)
                console.log(`docs[${i}]:`, coverId);*/
            }   
        }



        //when submitting the response 
    submit.addEventListener('click',function(event)
{
    event.preventDefault();
    get_the_book_details();
    alert('Searching for the book')
      
})

const get_the_book_details = async()=>
{
    try{

        const result = await axios.get(`https://openlibrary.org/search.json?q=${input.value}`);
        console.log(result)

      
        if (result.data.docs.length===0)
        {
            console.log("no such books found!")
        }
        else
        image_insertion(result)

    }
    catch(e)
    {
        console.log(e,"error errored near API feching!")
    }
   
}


    


    

    






})