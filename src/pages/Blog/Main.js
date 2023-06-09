import React, {useState, useEffect} from "react";
import BlogNoticiaModal from "./Noticia/Modal/Modal";
import BlogNovaMateria from "./BlogNovaMateria/BlogNovaMateria";
import CommentNews from "./Noticia/CommentNews/CommentNews";
import useApi from "../Utils/useApi";

function Main(){
    const [isModalVisible, setIsModalVisible, noticiaId] = useState(false);
    const [tipoNoticia, setTipoNoticia] = useState(() =>{
        return 'Noticia'});
    const [cor, setCor] = useState();
    
    
    const [load_news, loadnews] = useApi ({
        url: '/noticias',
        params:{
        }
    });

    useEffect(() => {
        load_news();
    }, []);
    
    if (!loadnews.data){
        console.log(loadnews.data)
        return <div>Carregando</div>
    }
    
    const alterar = (tipo, cor) => {
        setTipoNoticia(tipo)
        setCor(cor)
        
        if (tipo === 'Evento'){
            
            document.querySelector('#eventos').style.backgroundColor='#FFD600'
            document.querySelector('#artigos').style.backgroundColor='#4B4B4B'
            document.querySelector('#noticias').style.backgroundColor='#4B4B4B'


        } if (tipo === 'Artigo'){

            document.querySelector('#eventos').style.backgroundColor='#4B4B4B'
            document.querySelector('#artigos').style.backgroundColor='#FFD600'
            document.querySelector('#noticias').style.backgroundColor='#4B4B4B'

        }if (tipo === 'Noticia'){
            
            document.querySelector('#eventos').style.backgroundColor='#4B4B4B'
            document.querySelector('#artigos').style.backgroundColor='#4B4B4B'
            document.querySelector('#noticias').style.backgroundColor='#FFD600'

        }
    }

    function carregaNoticias(){
        {load_news.data
            .filter(function(carrega){
                for(let i = 0; i < 4; i++){
                    return carrega.id === i
                }   
            })
            .map((item) =>
            (

                <a href="/Blog/noticia/i" className="link">
                <CommentNews
                    imagemUrl = {item.imagemUrl}
                    titulo = {item.titulo}
                    conteudo = {item.conteudo}
                ></CommentNews>
                </a>
            ))}

   

    }
    



    
    return(
        <body className="body">
            <div >
                <div>
                    <button className="BlogAdicionarNovasMaterias" 
                            onClick={() => setIsModalVisible(true)}>nova materia
                    </button>
                    {isModalVisible ? (<BlogNoticiaModal onClose={() => setIsModalVisible(false)}>
                                            <BlogNovaMateria noticiaId={noticiaId}>
                                                
                                            </BlogNovaMateria>
                                    </BlogNoticiaModal>) :null}
                </div>
                <div className="Principal">
                    <div className="fundo"></div>
                    <div className="noticia">

                        <div className="noticiaP">
                            <p id="tit">Principais Posts</p>
                            {loadnews.data
                                    .filter(function(carrega){
                                        return carrega.id > 1 && carrega.id <= 4;   
                                    }).map((item) =>
                                    (  
                                        <div className="noticiaPNoticias">
                                            <div>
                                                <img className="newsPrincipaisPequenas" src={item.imagemUrl}></img>
                                            </div>
                                            <a href={"/Blog/noticia/"+ item.id} className="linkNoticiasPrincipaisPequenas">
                                                <strong><p className="tituloNoticiasPequenas">{item.titulo}</p></strong>
                                                <p className="text3">{item.conteudo}</p>
                                            </a>
                                            
                                        </div>
                            ))}
        
                        </div>
                            {loadnews.data
                                .filter(function(carrega){
                                    return carrega.id === 1;   
                            }).map((item) =>
                                (  
                                <a href={"/Blog/noticia/"+ item.id} className="link">
                                    <div className="noticiaG">
                                        <img src={item.imagemUrl} id="news"></img>
                                        <p id="text">{item.titulo}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                </div>
                
            </div>

            <div className="barra" id="barra">
                <div className="eventos" id="eventos" onClick={() => alterar('Evento')}>
                    <img src="/imagens/Vector.png" id="vector"></img>
                    <p id="txtbarra">Eventos</p>
                </div>

                <div className="artigos" id='artigos' onClick={() => alterar('Artigo')}>
                        <img src="/imagens/Vector2.png" id="vector2"></img>
                        <p id="txtbarra">Artigos</p>
                </div>

                <div className="noticias" id='noticias' onClick={() => alterar('Noticia')}>
                    <img src="/imagens/Vector3.png" id="vector3"></img>
                    <p id="txtbarra">Noticias</p>
                </div>

            </div>

            <div className="txt">
                <p id="txtPost">Posts</p>
                <p id="txtViral">Virais</p>
            </div>

            <div className="principal2">
                <div className="sub">
                    {loadnews.data
                        .filter(function(carrega){

                            return  tipoNoticia === carrega.tipoNoticia  
                        }).map((item) =>(
                            <div className="maior">
                                <div className="blocoAmarelo"></div>
                                <img src={item.imagemUrl} id="queimadas"></img>
                                <p id="perigo"><b>{item.titulo}</b></p>
                                <p id="perigoSub">{item.conteudo}</p>
                                <a href={"/Blog/noticia/"+ item.id} className="link">
                                    <button type="button" class="efeito efeito-3">Materia completa</button>
                                </a>
                            </div>
                        ))}
                    
                    {loadnews.data
                        .filter(function(carrega){

                            return  tipoNoticia === carrega.tipoNoticia 
                        }).slice(1, -1) 
                        .map((item) =>(
                            <div className="menorS">
                                <div className="blocoAmarelo2"></div>
                                <img src={item.imagemUrl} id="explorar"></img>
                                <p id="txtExpe">{item.titulo}</p>
                                <p id="txtExpe2">{item.conteudo}</p>
                                <a href={"/Blog/noticia/"+ item.id} className="link">
                                    <button type="button" class="efeito2 efeito-3">Materia completa</button>
                            </a>
                            </div>
                        ))}

                    {loadnews.data
                        .filter(function(carrega){
                        
                            return  tipoNoticia === carrega.tipoNoticia 
                        }).slice(1, -2) 
                        .map((item) =>(
                            <div className="menorI">
                                <div className="blocoAmarelo3"></div>
                                <img src={item.imagemUrl} id="noti"></img>
                                <p id="txtExpe">{item.titulo}</p>
                                <p id="txtExpe2">{item.conteudo}</p>
                                <a href={"/Blog/noticia/"+ item.id} className="link">
                                    <button type="button" class="efeito2 efeito-3">Materia completa</button>
                                </a>

                            </div>
                        ))}
                       
                        
                </div>
                
            </div>
    </body>

    )
}

export default Main;