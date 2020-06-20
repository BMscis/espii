const sectorscroll = document.getElementsByClassName("sector")
window.addEventListener("load", e =>{
    if("load"){
        function widgetButtons(){
            const addPlaylist = document.getElementsByClassName("addlibrary");
            const setPlaylist = document.getElementsByClassName("setlibrary");
            const likeButton = document.getElementsByClassName("like")
            const likedButton = document.getElementsByClassName("liked")
            function active(x=null,y=null){
                x.addEventListener("click",function(){
                    if (x.classList.contains("active")){
                        x.classList.remove("active")
                        x.classList.add("inactive")
                        y.classList.remove("inactive")
                        y.classList.add("active")
                        
                    }
                    else{
                        x.classList.remove("inactive")
                        x.classList.add("active")
                        y.classList.remove("active")
                        y.classList.add("inactive")
                        
                        
                    }
                })
                y.addEventListener("click",function(){
                    if (x.classList.contains("active")){
                        x.classList.remove("active")
                        x.classList.add("inactive")
                        y.classList.remove("inactive")
                        y.classList.add("active")
                    }
                    else{
                        x.classList.remove("inactive")
                        x.classList.add("active")
                        y.classList.remove("active")
                        y.classList.add("inactive")
                    }
                })
            }
            for(var i =0; i < addPlaylist.length;i++){
                active(addPlaylist[i],setPlaylist[i])
                active(likeButton[i],likedButton[i])
            }
        }
        function stationLogos(){
            import(/*webpackChunckName: 'print' */ './station_logos').then(module => {
                const station_logos = module.default;
                station_logos()
            })
        }
        function walletScroller(){
            const a_l = document.getElementsByClassName("arrow_left")[0]
            const a_r = document.getElementsByClassName("arrow_right")[0]
            const wallet_line = document.getElementsByClassName("wallet")[0]
            const scroll_length_R = parseInt(wallet_line.scrollWidth)
            const scroll_length_L = parseInt(wallet_line.scrollWidth)
            const scroll_by = 300
            a_r.addEventListener("click", function(){
                if (scroll_length_R - scroll_by > 0){
                    a_r.classList.remove("done")
                    wallet_line.scrollBy(scroll_by,0)
                }
                else{
                    a_r.classList.add("done")
                }
            })
            a_l.addEventListener("click", function(){
                if (scroll_length_L - scroll_by > 0){
                    a_r.classList.remove("done")
                    wallet_line.scrollBy(-scroll_by,0)
                }
                else{
                    a_r.classList.add("done")
                }
            })

        }
        function popup(){
            const popup = document.getElementsByClassName("popup")
            const list = document.getElementsByClassName("list")
            function pop(x,y){
                x.addEventListener("click",function(){
                    if(y.style.display == "table-column"){
                        y.style.display = ""    
                    }
                    else{
                    y.style.display = "table-column"
                }

                })
            }
            for(var i =0; i < list.length;i++){
                pop(list[i],popup[i])
            }
        }
        function showmenu(){
            menu = document.getElementsByClassName("menu")
            menu_dropdown = document.getElementsByClassName("menu-dropdown")
            notifications_dropdown = document.getElementsByClassName("notifications-dropdown")
            notifications = document.getElementsByClassName("notifications")
            function drop(x,y)
            {
            x.addEventListener("click", function(){
                if(y.classList.contains("open")){
                    y.classList.remove("open")
                }
                else{
                    y.classList.add("open")
                }
            })
            }
            for(var i =0; i < menu.length;i++){
                drop(menu[i],menu_dropdown[i])
                drop(notifications[i],notifications_dropdown[i])
            }
        }
        function scrollTable(){
            playButton = document.getElementsByClassName("play-arrow");
            playTable = document.getElementsByClassName("tables");
            function scrolltoview(x,y){
                x.addEventListener("click", function(){
                    var unhide = document.getElementsByClassName("unhide")
                    if(unhide.length > 0){
                        unhide[0].classList.add("hide")
                        unhide[0].classList.remove("unhide")
                        y.classList.remove("hide")
                        y.classList.add("unhide")
                        y.scrollIntoView(false);
                    }
                })
            }
            for(var i =0; i < playButton.length;i++){
                scrolltoview(playButton[i],playTable[i])
            }
        }
        widgetButtons()
        stationLogos()
        walletScroller()
        popup()
        showmenu()
        scrollTable()
    }
})