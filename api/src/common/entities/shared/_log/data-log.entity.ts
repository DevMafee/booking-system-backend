import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminUserEntity } from "../../admin/users/admin-user.entity";

@Entity("_data_log")
export class DataLogEntity{
    @PrimaryGeneratedColumn("uuid")
    request_id: string;

    @Column({type: "varchar"})
    log_id: string;

    @Column({type: "varchar", nullable:true})
    sub_log_id: string;

    @Column({type: "varchar"})
    action_type: string;

    @Column({type: "varchar"})
    action_for: string;

    @Column({type: "varchar"})
    action_user_type: string;

    @Column({type: "longtext", name: "data", nullable:true})
    data: string;

    @CreateDateColumn()
    created_at: Date

    @Column({type: "string", name: "created_by", length: 36, default: null})
    created_by: string;

    @ManyToOne(type => AdminUserEntity, adminUser => adminUser.id)
    @JoinColumn({name: "created_by"})
    admin_user_info: AdminUserEntity;
}