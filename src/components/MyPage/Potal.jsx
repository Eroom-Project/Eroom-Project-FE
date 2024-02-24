import ReactDOM  from "react-dom";

export const MyPageModalPotal = (props) => {
    const el = document.getElementById("mypage-modal");
    return ReactDOM.createPortal(props.children, el)
}

export const MyPageRemovePotal = (props) => {
    const el = document.getElementById("mypage-remove-alert");
    return ReactDOM.createPortal(props.children, el)
}

export const MyPagePasswordPotal = (props) => {
    const el = document.getElementById("mypage-password-alert");
    return ReactDOM.createPortal(props.children, el)
}