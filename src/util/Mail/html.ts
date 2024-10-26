export function html(email: string, code: string, device: string) {
    return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Verification Code</title>
                    <style>
                        ${css()}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Unknown</h1>
                        <p>
                            Enter the following verification code when prompted to securely sign in
                            to your <b>${email}</b> account.
                        </p>
                        <p>This <b>code</b> will expire in 15 minutes.</p>

                        <div class="code-container">
                            <span class="code">${code}</span> </div>

                        <p>
                            This sign in was requested using on <b>${device}</b>. If you didn't
                            request the sign in, you can safely ignore this email.
                        </p>
                        <p>Thanks,</p>
                        <p>Unknown team</p>
                    </div>
                </body>
            </html>
`
}


function css() {
    return `
        body {
                        font-family: sans-serif;
                        margin: 0;
                        padding: 0;

                        background-color: #f5f5f5;
                        color: #333;
                    }

                    .container {
                        width: 500px;
                        margin: 100px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #333;
                    }

                    p {
                        margin-bottom: 10px;
                    }

                    .code-container {
                        text-align: center;
                        margin-bottom: 20px;
                        font-size: 24px;
                        font-weight: bold;
                    }

                    .code {
                        background-color: #f0f0f0;
                        padding: 10px 20px;
                        border-radius: 5px;
                        display: inline-block;
                    }

`
}
