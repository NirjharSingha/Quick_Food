package com.example.quickFood.SSLCommerzGateway.parametermappings;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Gw {
    public String visa;
    public String master;
    public String amex;
    public String othercards;
    public String internetbanking;
    public String mobilebanking;
}
