import React, { Component } from 'react';
import './New.css'
import api from '../services/api'

export default class New extends Component{
    state = {
        image:null,
        author:"",
        place:"",
        description:"",
        hashtags:""
    }
    makeFormData = () =>{
        const data = new FormData()       
        Object.keys(this.state).map( key =>{            
            data.append(key,this.state[key])
        })
        return data
    }
    handleSubmit = async e =>{
        e.preventDefault()
        let data =this.makeFormData()

        await api.post('posts',data);

        this.props.history.push('/')                
    }
    handleImageChange = (e) =>{
        this.setState({image:e.target.files[0]})
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file"
                    onChange={this.handleImageChange}
                />
                <input type="text"
                    name="author"
                    placeholder="autor do post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />
                <input type="text"
                    name="place"
                    placeholder="local do post"
                    onChange={this.handleChange}
                    value={this.state.place}
                />
                <input type="text"
                    name="description"
                    placeholder="descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <input type="text"
                    name="hashtags"
                    placeholder="hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}