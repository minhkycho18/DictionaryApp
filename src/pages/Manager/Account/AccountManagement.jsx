import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Space, notification } from "antd";
import "./AccountManagement.scss";
import AccountDataTable from "../../../components/data-table/Account/AccountDataTable";
import AddAccountModal from "./AddAccountModal";
import { useEffect, useState } from "react";
import {
  createAccount,
  getAllUser,
  lockAccount,
  unlockAccount,
} from "../../../api/User/user";

const AccountManagement = () => {
  const [usersData, setUsersData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllUser();
      setUsersData(response);
    };
    getData();
  }, []);

  const handleSearch = (keyword) => {
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword === "") {
      setDataSearch([]);
    } else {
      const lowerKeyword = trimmedKeyword.toLowerCase();
      const newData = usersData.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerEmail = item.email.toLowerCase();
        return (
          lowerName.includes(lowerKeyword) || lowerEmail.includes(lowerKeyword)
        );
      });
      setDataSearch(newData);
    }
    setSearching(!!trimmedKeyword);
  };

  const register = async (data) => {
    try {
      const response = await createAccount(data);
      const newData = [...usersData, response];
      setUsersData(newData);
      notification.success({
        message: "Registration Success",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Registration Failed",
        description: error,
      });
    }
  };

  const handleLockAndUnlockAccount = async (data) => {
    if (data.action === "lock") {
      await lockAccount(data.id);
    } else if (data.action === "unlock") {
      await unlockAccount(data.id);
    }
    setUsersData((prevUsersData) =>
      prevUsersData.map((item) =>
        item.userId === data.id ? { ...item, lock: !item.lock } : item
      )
    );
  };

  return (
    <>
      <Space
        className={"content-container_box"}
        direction={"vertical"}
        size={"large"}
      >
        <Row className={"box_title"}>
          <Col className={"title"} span={24}>
            Account Management
          </Col>
        </Row>
        <div className="box_data" style={{ gap: "20px" }}>
          <Row className={"box_data_item search_box"}>
            {/* <Col offset={1} span={8}>
              <Space direction={"vertical"}>
                <span className="pos_filter-title">
                  Filter by <FilterOutlined />
                </span>
                <Select
                  bordered
                  placeholder="-- All --"
                  style={{ width: 200 }}
                  className="pos_filter-select"
                />
              </Space>
            </Col> */}
            <Col
              offset={16}
              span={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Input
                className="search_vocab"
                placeholder={`Search User`}
                prefix={
                  <SearchOutlined
                    style={{ color: "#bbb", padding: "0px 4px" }}
                  />
                }
                // suffix={
                //   searching && (
                //     <CloseOutlined
                //       style={{
                //         fontSize: "12px",
                //         padding: "2px",
                //         marginLeft: "2px",
                //         textAlign: "center",
                //         cursor: "pointer",
                //       }}
                //     ></CloseOutlined>
                //   )
                // }
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              ></Input>
            </Col>
            <Col offset={20} span={4} style={{ marginTop: "20px" }}>
              <AddAccountModal handleRegister={register} />
            </Col>
          </Row>
          <Row justify={"center"} className={"box_data_item table_box"}>
            <Col span={22}>
              <AccountDataTable
                dataSource={searching ? dataSearch : usersData}
                handleRegister={register}
                handleChangeStatusAccount={handleLockAndUnlockAccount}
              />
            </Col>
          </Row>
        </div>
      </Space>
    </>
  );
};

export default AccountManagement;
