<template>
    <div class="home">
        <header>
            <div class="header-content-wrapper">
                <logo-title></logo-title>
                <div class="right-side-btns">
                    <button v-on:click="signOut">
                        Sign out
                    </button>
                </div>
            </div>
        </header>
        <div class="content-wrapper">
            <form class="new-link-form" v-on:submit="addLink">
                <input class="new-link" type="text" v-model="newlink">
                <button type="submit">Add</button>
            </form>
            <link-card v-for="link in links" 
                v-bind:name="link.name"
                v-bind:link="link.link"
                v-bind:key="link.id"
            ></link-card>
        </div>
        
    </div>
</template>
<style>
    .home header {
        height: 60px;
        background: #FF7043;
        color: #FFF;
    }
    .header-content-wrapper {
        max-width: 1000px;
        padding: 10px;
        margin: auto;
        display: flex;
        justify-content: space-between;
    }
    .home header button {
        background: transparent;
        color: #FFFFFF;
        border: 1px solid;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    }
    .home header button:hover {
         background-color: #FFFFFF;
         color: #FF7043;
    }
    .home .content-wrapper {
        max-width: 1000px;
        padding: 10px;
        margin: auto;
    }
    .content-wrapper input {
        border: 1px solid;
        padding: 10px;
        margin: 8px 0;
        border-radius: 3px;
		width: 100%;
		box-sizing: border-box;
	}
	.content-wrapper input:focus  {
		border-color: #FF7043;
	}
    .new-link-form {
        width: 800px;
        display: flex;
        margin: auto;
    }
    .home .content-wrapper button {
        border: none;
        padding: 9px;
        border-radius: 3px;
        color: #FFF;
        background: #FF7043;
		cursor: pointer;
        margin: 8px 4px;
        width: 60px;
	}
</style>
<script>
import LogoWithTitle from "./components/LogoWithTitle";
import linkService from "../services/link";
import LinkCard from "./components/LinkCard";
export default {
    props: ['user'],
    sockets: {
        connect: function() {
            console.log('socket connected', this.user)
        },
        newLink: function(data) {
            if (this.sendingLinks.indexOf(data.tid) !== -1) {
                this.sendingLinks.splice(this.sendingLinks.indexOf(data.id), 1);
                return;
            }
            if (Notification.permission === "granted") {
                var notification = new Notification(data.link);
                notification.onclick = function(event) {
                    event.preventDefault();
                    window.open(data.link, '_blank');
                }
            }
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        var notification = new Notification(data.link);
                        notification.onclick = function(event) {
                            event.preventDefault();
                            window.open(data.link, '_blank');
                        }
                    }
                });
            }
            console.log(data)
        }
    },
    data(){
        return {
            newlink: '',
            links: [],
            sendingLinks: []
        }
    },
    created: function() {
        linkService.list(this.user.token).then(res=>res.json())
        .then((res) => {
            this.links = res;
        })
    },
    components: {
        'logo-title': LogoWithTitle,
        'link-card': LinkCard
    },
    methods: {
        signOut: function() {
            this.$emit('logout');
        },
        addLink: function() {
            let tid = Math.random().toString(36).substring(2);
            this.sendingLinks.push(tid);
            linkService.add(this.newlink, this.user.token, tid).then((res) => {
                console.log(res);
            }).catch((err)=>{
                console.log('Error:', err);
            });
        }
    }
}
</script>


