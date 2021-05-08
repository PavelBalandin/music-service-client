import LinkedList from "./LinkedList";

export default class LinkedAudioPlayer {

    constructor() {
        this.path = 'http://localhost:8080/audio/'
        this.state = false; //State of music, play or pause
        this.music = null; //Current track
        this.audio = null; //Current audio
        this.musicList = new LinkedList(); //Current musicList
        this.volume = 0.5
    }


    play() {
        this.audio.play();
        return this.state = true;
    }

    pause() {
        this.audio.pause();
        return this.state = false;
    }

    next() {
        if (this.musicList.find(this.music).next)
            this.start(this.musicList.find(this.music).next.value);
        return 0;
    }


    prev() {
        if (this.musicList.find(this.music).previous)
            this.start(this.musicList.find(this.music).previous.value);
    }

    loadAudio(path) {
        this.audio = new Audio(path);
    }


    start(music = this.music) {
        if (this.audio === null) {
            this.loadAudio(this.path + music.audio);
            this.music = music;
        }
        if (this.music.id === music.id && this.state === true)
            this.pause();
        else if (this.music.id === music.id && this.state === false)
            this.play();
        else {
            this.pause();
            this.loadAudio(this.path + music.audio);
            this.music = music;
            this.play();
        }
        this.audio.volume = this.volume;
    }

    volume_update(volume) {
        this.volume = volume;
        if (this.audio !== null) {
            this.audio.volume = volume;
        }
    }

}