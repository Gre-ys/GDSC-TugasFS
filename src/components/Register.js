import React from 'react';

const Register = (props) => {
	return(
		<>
			<div className='row d-flex justify-content-center mt-5'>
				<div className='card col col-md-8 border-secondary'>
					<div className='row d-flex justify-content-center'>
						<h5 className='col col-md-2 m-auto mb-3'>Registrasi</h5>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col col-md-2'>
							<h6>Username:</h6>
						</div>
						<div className='col col-md-4 mb-4 '>
							<input type="text" className='form-control' onChange={(event) => props.setUsername(event.target.value)}></input> 
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col col-md-2'>
							<h6>Password:</h6>
						</div>
						<div className='col col-md-4 mb-4 '>
							<input type="password" className='form-control' onChange={(event) => props.setPassword(event.target.value)}></input>
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col col-md-4 mb-4 '>
							<button type="submit" className='form-control btn-primary' onClick={() => {props.register()}}>Registrasi</button>
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col col-md-3 mb-3 '>
							<h6>Sudah Punya Akun?</h6>
						</div>
						<div className='col col-md-2 mb-3 '>
							<button type="submit" className='form-control btn-outline-secondary' onClick={() => {props.setPageLogin(true); props.setPageRegister(false);}}>Login</button>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-center mt-2'>
					<h4>{props.responseRegister}</h4>
				</div>
			</div>
		</>
	);
};
export default Register;
// bagian input pake onclick change simpen data ketikan di state, button buat trigger state