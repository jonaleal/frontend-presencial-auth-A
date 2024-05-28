
import { FormData } from './IFormData';
import { Session } from 'next-auth';
import { InputWLabel } from 'components/components-Auth-a/InputWLabel';

interface SignupInfoProps {
    formData: FormData,
    setFormData: Function
    setValidSignup: Function,
    thridPartySession: Session | null
}

const SignupInfo = ({ formData, setFormData, setValidSignup, thridPartySession }: SignupInfoProps) => {

    const checkPassword = (password: string) => {

        const requiredLength = 8;
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>+-]/.test(password);
        const hasUpperCaseLetter = /[A-Z]/.test(password);
        const hasLowerCaseLetter = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        return (
            password.length >= requiredLength &&
            hasSpecialCharacter &&
            hasUpperCaseLetter &&
            hasLowerCaseLetter &&
            hasNumber
        );
    }

    return (
        <div className='form-fields-container gap-4 w-full'>
            <InputWLabel
                id="email-input"
                label='Email'
                onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                placeholder='john@gmail.com'
                type="email"
                value={thridPartySession?.user ? (thridPartySession.user.email as string) : (formData.mail)}
                disabled={thridPartySession?.user ? true : false}
            />
            <div className={thridPartySession?.user ? "invisible" : ""}>
                <InputWLabel
                    id="password-input"
                    label='Constraseña'
                    onChange={
                        (e) => {
                            setFormData({ ...formData, password: e.target.value })
                            setValidSignup(checkPassword(e.target.value))
                        }
                    }
                    type="password"
                    value={formData.password}
                />
            </div>
            <div className={thridPartySession?.user ? "invisible" : ""}>
                <InputWLabel
                    id="confirm-password-input"
                    label='Confirmar contraseña'
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    type="password"
                    value={formData.confirmPassword ?? ''}
                />
            </div>
        </div>
    );
}

export { SignupInfo };