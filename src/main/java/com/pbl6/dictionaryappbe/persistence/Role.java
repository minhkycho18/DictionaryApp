package com.pbl6.dictionaryappbe.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long roleId;

    @Column(name = "name", length = 30)
    private String name;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
