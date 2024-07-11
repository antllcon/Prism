import {BOT_STATES} from "./const";
import {yellow, TEAM_STATES} from "../game/const";

export let BOT = {
    x: 200,
    y: 200,
    size: 10,
    color: yellow,
    speed: 300,
    team: TEAM_STATES.YELLOW,
    state: BOT_STATES.ACTIVE,
    side: 'enemy'
}