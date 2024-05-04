package com.example.quickFood.SSLCommerzGateway.parametermappings;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SSLCommerzInitResponse {

    public String status;
    public String failedreason;
    public String sessionkey;
    public Gw gw;
    public String redirectGatewayURL;
    public String redirectGatewayURLFailed;
    public String GatewayPageURL;
    public String storeBanner;
    public String storeLogo;
    public List<Desc> desc;
    public String is_direct_pay_enable;

}