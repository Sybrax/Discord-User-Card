<template>
  <div class="card">
    <div class="card-header">
      <div v-if="$props.bannerImage" class="banner-img" :style="{ background: `url(${$props.bannerImage})`}"></div>
      <div v-else class="banner"></div>
    </div>
    <div class="card-body">
      <div class="profile-header">
        <a v-if="$props.userId" class="profil-logo" :href="`https://discord.com/users/${$props.userId}`" target="_blank">
          <img :src="$props.avatar" alt="profil-logo">
        </a>
        <div v-else class="profil-logo">
          <img :src="$props.avatar" alt="profil-logo">
        </div>
        <div v-if="$props.badges && $props.badges.length > 0" class="badges-container">
          <div v-for="badge in $props.badges" class="badge-item" :key="badge.iconUrl">
            <img :src="badge.iconUrl" alt="" />
            <div class="tooltip tooltip-up">{{ badge.tooltip }}</div>
          </div>
        </div>
      </div>
      <div class="profile-body">
        <div class="username">
          {{ $props.username }}<span v-if="$props.discriminator">#{{ $props.discriminator }}</span>
          <div v-if="$props.userLabel" class="badge">{{ $props.userLabel }}</div>
        </div>
        <hr />
        <a v-if="$props.button" :href="$props.button.url" target="_blank" class="btn">{{ $props.button.text }}</a>
        <div class="basic-infos">
          <div class="category-title">About Me</div>
          <p>
            <slot></slot>
          </p>
        </div>
        <div v-if="$props.memberSince" class="basic-infos">
          <div class="category-title">Member Since</div>
          <p>{{ $props.memberSince }}</p>
        </div>
        <div v-if="$props.roles" class="roles">
          <div class="category-title">Roles</div>
          <div class="roles-list">
            <div v-for="role in $props.roles" class="role" :key="role.name">
              <div class="role-color" :style="{ background: role.color }" @click="(e) => e.target.parentElement.remove()"></div>
              <p>{{ role.name }}</p>
            </div>
            <div class="role role-add">
              <div class="role-add-text" @click="(e) => addRole(e.target)">+</div>
            </div>
          </div>
        </div>
        <div class="note">
          <div class="category-title">Note</div>
          <textarea placeholder="Click to add a note"></textarea>
        </div>
        <div v-if="$props.acceptMessages" class="message">
          <input type="text" :placeholder="`Message @${$props.username}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscordUserCard",
  props: {
    bannerImage: {
      type: String, // You can put a local path or an URL
      default: null
    },
    bannerColor: {
      type: String, // You can use everithing that you could put in a CSS "background-color"
      default: "#5865F2"
    },
    avatar: {
      type: String, // You can put a local path or an URL
      default: null,
      required: true
    },
    badges: {
      type: Array, // Array must be formated like this : [{ iconUrl: "https://icon.example", tooltip: "Example" }, {...}, ...]
      default: null,
      required: false
    },
    username: {
      type: String,
      default: null,
      required: true
    },
    discriminator: {
      type: String,
      default: null,
      required: false
    },
    userLabel: {
      type: String,
      default: null,
      required: false
    },
    memberSince: {
      type: String,
      default: null,
      required: false
    },
    roles: {
      type: Array, // Array must be formated like this : [{ name: "Example", color: "#5865F2" }, {...}, ...]
      default: null,
      required: false
    },
    availableRoles: {
      type: Array, // Array must be formated like this : [{ name: "Example", color: "#5865F2" }, {...}, ...]
      default: null,
      required: false
    },
    acceptMessages: {
      type: Boolean, // Remove the "Message @XXX" input
      default: false,
      required: false
    },
    button: {
      type: Object, // Object must be formated like this : { text: "Example", url: "https://example.com" }
      default: null,
      required: false
    },
    userId: {
      type: String,
      default: null,
      required: false
    }
  },
  methods: {
    randomWord () {
      return this.$props.availableRoles[Math.floor(Math.random() * this.$props.availableRoles.length)];
    },
    addRole (card) {
      const role = document.createElement("div");
      const roleColor = document.createElement("div");
      const roleText = document.createElement("p");
      role.classList.add("role");
      roleColor.classList.add("role-color");
      roleColor.style.backgroundColor = this.randomHexColor();
      roleText.innerText = this.ramdomWord();
      role.append(roleColor, roleText);
      card.parentElement.append(role, card);
      roleColor.onclick = (e) => e.target.parentElement.remove();
    },
    randomHexColor () {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Whitney", sans-serif;
  box-sizing: border-box;
}

.tooltip {
  display: block;
  position: absolute;
  color: #b6b7b7;
  background: #18191c;
  padding: 0.4rem;
  border-radius: 3px;
  max-width: 150px;
  width: max-content;
  font-size: 0.9rem;
  transform: scale(0);
  transition: 0.055s ease-in-out transform;
  z-index: 10;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);
}

.tooltip-up {
  bottom: 42px;
}

.tooltip-up::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #18191c;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: #6d5cff;
  padding: 10px;
  border-radius: 3px;
  color: #fff;
  font-size: 0.85rem;
  transition: 0.2s ease-in-out;
  margin-top: 12px;
}

.btn:hover {
  background-color: #4752c4;
}

.card {
  background: #292b2f;
  width: 345px;
  max-height: 95%;
  height: max-content;
  border-radius: 9px;
  box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.2);
  scrollbar-width: none;
}

.card::-webkit-scrollbar {
  display: none;
}

.card-header .banner {
  width: 100%;
  height: 60px;
  background: v-bind(bannerColor);
  border-radius: 6px 6px 0 0;
  overflow: hidden;
}

.card-header .banner-img {
  width: 100%;
  height: 120px;
  background-position: center !important;
  background-size: 100% auto !important;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
}

.card-body {
  padding: 15px;
  position: relative;
}

.card-body .profile-header {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: calc(100% - 30px);
  top: -50px;
}

.card-body .profile-header .profil-logo {
  position: relative;
  border: 6px solid #292b2f;
  border-radius: 50%;
}

.card-body .profile-header .profil-logo img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.card-body .profile-header .profil-logo::before {
  content: "See Profil";
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
  width: 100%;
  height: 100%;
  color: #eeeeee;
  background: #0000007e;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  transition-duration: 0.15s;
}

.card-body .profile-header .profil-logo:hover::before {
  opacity: 1;
}

.card-body .profile-header .badges-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 150px;
  background: #18191c;
  border-radius: 7px;
  padding: 3px;
}

.card-body .profile-header .badges-container .badge-item {
  position: relative;
  margin: 5px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.card-body .profile-header .badges-container .badge-item img {
  height: 100%;
}

.card-body .profile-header .badges-container .badge-item:hover > .tooltip {
  transform: scale(1);
}

.card-body .profile-body {
  background: #18191c;
  border-radius: 7px;
  padding: 13px;
  margin-top: 40px;
}

.card-body .profile-body .username {
  color: #eeeeee;
  margin-bottom: 13px;
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-body .profile-body .username span {
  color: #b9bbbe;
}

.card-body .profile-body .username .badge {
  font-size: 0.65rem;
  background-color: #5865f2;
  text-transform: uppercase;
  font-weight: 300;
  width: max-content;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 3px;
}

.card-body .profile-body hr {
  border: none;
  border-top: 0.5px solid #33353b;
}

.card-body .profile-body .category-title {
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.card-body .profile-body .basic-infos {
  margin-bottom: 14px;
  margin-top: 12px;
}

.card-body .profile-body .basic-infos p {
  color: #bdbebf;
  font-size: 0.9rem;
}

::v-slotted(.card-body .profile-body .basic-infos p a) {
  color: #02a5e6;
  text-decoration: none;
}

::v-slotted(.card-body .profile-body .basic-infos p a):hover {
  text-decoration: underline;
}

::v-slotted(.card-body .profile-body .basic-infos p b) {
  color: #ddd;
}

.card-body .profile-body .roles {
  margin-bottom: 14px;
}

.card-body .profile-body .roles .roles-list {
  display: flex;
  flex-wrap: wrap;
}

.card-body .profile-body .roles .roles-list .role {
  background: #292b2f;
  color: #f5f5f5;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 300;
  padding: 3px 6px;
  margin-right: 4px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.card-body .profile-body .roles .roles-list .role .role-color {
  position: relative;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin-right: 5px;
}

.card-body .profile-body .roles .roles-list .role .role-color:hover::before {
  content: "✖";
  position: absolute;
  top: -2px;
  right: -2px;
  font-size: 0.65rem;
  color: #f5f5f5;
  background: #292b2f;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.card-body .profile-body .roles .roles-list .role-add {
  cursor: pointer;
}

.card-body .profile-body .note textarea {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  min-height: 30px;
  color: #e0e0e0;
  resize: none;
  font-size: 0.8rem;
  border-radius: 3px;
  padding: 5px;
  box-sizing: border-box;
  scrollbar-width: none;
}

.card-body .profile-body .note textarea::-webkit-scrollbar {
  display: none;
}

.card-body .profile-body .note textarea::placeholder {
  font-size: 0.8rem;
}

.card-body .profile-body .note textarea:focus::placeholder {
  opacity: 0;
}

.card-body .profile-body .message input {
  background: transparent;
  outline: none;
  border: 1.2px solid #4b4b4b;
  padding: 13px;
  width: 90%;
  border-radius: 4px;
  color: #eeeeee;
  margin-top: 14px;
}
</style>