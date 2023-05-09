import React, {useState} from 'react';

const SignIn = () => {
    const [ email, setEmail ] = useState<string>();
    const [password, setPassword ] = useState<string>();

    return (
        <div>Sign in page</div>
    );
}

export default SignIn;