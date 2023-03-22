const generateRefOTP = (length = 6) => {
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let n = str.length;

  let Ref = "";

  for (var i = 1; i <= length; i++) {
    let ran = Math.floor(Math.random() * 100) % n;
    Ref += str[ran];
  }

  return Ref;
};

export default generateRefOTP;
