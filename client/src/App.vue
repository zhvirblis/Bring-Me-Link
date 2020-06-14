<template>
	<div class="app-wrapper">
		<login-page v-if="!user" v-on:login="login"></login-page>
        <home v-if="user" v-bind:user="user" v-on:logout="logout"></home>
	</div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from './pages/Login';
import Home from './pages/Home';
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';

Vue.use(VueRouter);

export default {
    name: 'app',
    data () {
        let user = null;
        let userJsonString = localStorage.getItem('user');
        if(userJsonString) {
			user = JSON.parse(userJsonString);
			Vue.use(new VueSocketIO({
				connection: io('/', {
					query: `auth_token=${user.token}`
				})
			}));
        }
        return {
            user: user,
            postFontSize: 1
        }
    },
    components: {
        'login-page': LoginPage,
        'home': Home 
    },
    methods: {
        login: function(user) {
			this.user = user;
			/*Vue.use(new VueSocketIO({
				connection: io('/', {
					query: `auth_token=${user.token}`
				})
			}));*/

            localStorage.setItem('user', JSON.stringify(user));
		},
		logout: function() {
			this.user = null;
			localStorage.removeItem('user');
		}
    }
}
</script>

<style>
	html {
		font-family: 'LatoRegular';
		font-weight: normal;
		font-style: normal;
		height: 100%;
	}
	body {
		height: 100%;
	}
	.app-wrapper {
		height: 100%;
	}
	h1, h2, h3 {
		font-weight: 200
	}
	#app {
		height: 100%;
	}
	* {
		margin: 0;
		padding: 0;
	}
</style>
