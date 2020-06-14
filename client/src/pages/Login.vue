<template>
	<div class="loginpage">
		<header>
			<logo-title></logo-title>
		</header>
		<div class="right-panel">	
			<div class="wrapper">
				<form v-on:submit="login">
					<h2>Login</h2>
					<input v-model="loginUsername"  type="name" placeholder="Your username" required/>
					<input v-model="loginPassword"  type="password" placeholder="Your password" required/>
					<button type="submit">Login</button>
				</form>
			</div>
			<div class="wrapper">
				<form v-on:submit="registration">
					<h2>Registration</h2>
					<input v-model="regUsername" type="name" placeholder="Your username" required/>
					<input v-model="regEmail" type="email" placeholder="Your email" required/>
					<input v-model="regPassword" type="password" placeholder="Password" required/>
					<input v-model="regPassword2" type="password" placeholder="Repeat password" required/>
					<button type="submit">Sign up</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import loginService from  "./../services/login";
	import regService from  "./../services/reg";
	import LogoWithTitle from "./components/LogoWithTitle";

	export default {
		props: ["user"],
		data(){
			return {
				loginUsername: "",
				loginPassword: "",
                regUsername: "",
                regEmail: "",
                regEmail: "",
                regPassword: "",
                regPassword2: "",
			}	
		},
		methods: {
			login: function(){
				loginService(this.loginUsername, this.loginPassword)
					.then((res) => {
						if(res.status === 200) {
                            res.json().then((res) => {
                                this.$emit('login', res);
                            });
					    }
					    else {
					    }
				    })
				    .catch((err) => {
					    console.log(err);
				    });	
			},
            registration: function(){ 
				regService(this.regUsername, this.regEmail, this.regPassword, this.regPassword2)
					.then((res) => {
						if(res.status === 200) {
					}
					else {
						console.log(res);
					}
				})
				.catch((err) => {
					console.log(res);
                });
            }
		},
		components: {
			'logo-title': LogoWithTitle
		}	
	}
</script>
<style>
	.loginpage {
		background: #FF7043;
		height: 100%;
		color: #FFF;
	}
	.loginpage header h1 {
		padding: 20px;
	}
	.right-panel {
		float: right;
		width: 230px;
		color: #222222;
		height: 100%;
		background: #FDFDFD;
		overflow: auto;
	}
	.loginpage header {
		display: inline-block;
	}
	.right-panel .wrapper {
	    padding: 20px;
	}
	.right-panel input {
    	border: 1px solid;
	    padding: 6px;
	    margin: 8px 0;
	    border-radius: 3px;
		width: 100%;
		box-sizing: border-box;
	}
	.right-panel input:focus  {
		border-color: #FF7043;
	}
	.wrapper button {
	    width: 100%;
	    border: none;
	    padding: 9px;
	    border-radius: 3px;
	    color: #FFF;
	    background: #FF7043;
		cursor: pointer;
	}
	@media only screen and (max-width: 600px) {
		.right-panel {
			width: 100%;
			height: auto;
		}
	}
	.loginpage {
	    height: 100%;
	}
</style>
