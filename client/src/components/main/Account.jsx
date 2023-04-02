import React from 'react'

const Account = () => {
    return (
        <div><div class="container">
            <div class="main">
                <div class="main__header">
                    <center><h2>My Account</h2></center>
                </div>
                <div class="main__content">
                    <div class="main__avatar">
                        <div class="main__avatar--overlay">John Doe</div>
                    </div>
                    <div class="main__settings-form">
                        <form action="#" method="post">
                            <label class="main__input-label">Your name:</label>
                            <input class="main__input" placeholder="John Doe" type="text" />
                            <label class="main__input-label">Your e-mail:</label>
                            <input
                                class="main__input"
                                placeholder="johndoe@gmail.com"
                                type="text"
                            />
                            <label class="main__input-label"
                            >Your e-mail for notifications:</label
                            >
                            <input
                                class="main__input"
                                placeholder="johndoe@gmail.com"
                                type="text"
                            />
                        </form>
                        <button class="btn main__save-button">Save</button>
                        <button class="btn main__cancel-button">Cancel</button>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default Account;