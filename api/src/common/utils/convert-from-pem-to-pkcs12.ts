import * as forge from 'node-forge';

export const convertFromPemToPkcs12Service = (
  pem: string,
  password: string,
) => {
  const key = forge.pkcs5.pbkdf2(password, 'salt', 10000, 32);
  const iv = '0123456789abcdef'; // forge.random.getBytesSync(16);

  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(pem));
  cipher.finish();

  const pkcs12 = cipher.output.getBytes();
  return pkcs12;

  // fs.writeFileSync('iv.txt', forge.util.encode64(iv), 'utf8');
};
