import { Test, TestingModule } from '@nestjs/testing';
import { ConvertFromPemToPkcs12Service } from './convert-from-pem-to-pkcs12.service';
import { PEM } from './__tests__/const';

describe('ConvertFromPemToPkcs12Service', () => {
  let service: ConvertFromPemToPkcs12Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertFromPemToPkcs12Service],
    }).compile();

    service = module.get<ConvertFromPemToPkcs12Service>(
      ConvertFromPemToPkcs12Service,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert the pem file to pkcs12', () => {
    const result = service.execute(PEM, 'abc');
    expect(result).toBeTruthy();
  });
});
