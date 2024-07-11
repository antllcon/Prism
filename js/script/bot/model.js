import {BOT_STATES} from "./const";
import {red} from "../game/const";
import {TEAM_STATES} from "../game/const";

export let BOT = {
    x: 200,
    y: 200,
    size: 10,
    color: red,
    speed: 300,
    team: TEAM_STATES.YELLOW,
    state: BOT_STATES.ACTIVE,
    side: 'enemy'
}