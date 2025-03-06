import { convertFromPemToPkcs12Service } from './convert-from-pem-to-pkcs12';

const pem = `
-----BEGIN CERTIFICATE-----
MIICKDCCAc+gAwIBAgIRANQm7nxt8naD46fAn2MA5yswCgYIKoZIzj0EAwIwczEL
MAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNhbiBG
cmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh
Lm9yZzEuZXhhbXBsZS5jb20wHhcNMjUwMjE5MTY0NDAwWhcNMzUwMjE3MTY0NDAw
WjBqMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMN
U2FuIEZyYW5jaXNjbzENMAsGA1UECxMEcGVlcjEfMB0GA1UEAxMWcGVlcjAub3Jn
MS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABPatVFWFEs0w
R3nawwEKB8H5axJc4aJrwoCFhl4RYkMrV+82JkhJLN9JYA7Fquf0Lt/NbXTBbQ05
WJEclPyO/cKjTTBLMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMCsGA1Ud
IwQkMCKAIM4Gxxs2GKpHvz48pjx0evAPBMwZDpT7eX70eXzDDd/pMAoGCCqGSM49
BAMCA0cAMEQCIHFRUDX/vcd6oMGXPcuPcVlvYE01cz+3sbGxAk6Y22C1AiAugrIW
bRHJLjnDkM3QBvw+z2+oQrzw/RH84QBx/yF2EQ==
-----END CERTIFICATE-----
`;

describe('convertFromPemToPkcs12Service', () => {
  it('should convert the pem file to pkcs12', () => {
    const result = convertFromPemToPkcs12Service(pem, 'abc');
    expect(result).toBeTruthy();
  });
});
