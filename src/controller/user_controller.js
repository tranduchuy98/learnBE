import SuccessResponse from '../model/success_response.js';

export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    const resUser = {
        id: user.id,
        email: user.email
    }
    return res.status(200).send(new SuccessResponse('Thanh cong', resUser)).end();
  } catch(e){
    console.log(e)
    return res.sendStatus(500);
  }
}