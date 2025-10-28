import {ref} from "vue"
export default function useVisibilityToggle(isVisible = true){
    const visible = ref(isVisible);
    function toggle(){
        visible.value = !visible.value
    }
    return {
        visible,toggle
    }
}