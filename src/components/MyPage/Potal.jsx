import ReactDOM  from "react-dom";

export const MyPageModalPotal = (props) => {
    const el = document.getElementById("mypage-modal");
    return ReactDOM.createPortal(props.children, el)
}

export const MyPageRemovePotal = (props) => {
    const el = document.getElementById("mypage-remove-alert");
    return ReactDOM.createPortal(props.children, el)
}