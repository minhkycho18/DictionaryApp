import {CloseOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, Card, Col, Form, Input, message, Modal, Row, Space, Upload,} from "antd";
import React, {useEffect, useState} from "react";
import "./EditDefaultVocabularyModal.scss";
import getAudioUpload from "../../helpers/uploadCloudinary";
import {upperFirst} from "lodash";
import {BiSolidVolumeFull, BiSolidVolumeMute} from "react-icons/bi";
import {updateDefaultVocab} from "../../api/Vocabulary/vocabulary.api";

const EditDefaultVocabularyModal = (props) => {
    const [form] = Form.useForm();
    const [currentAudioUk, setCurrentAudioUk] = useState(null);
    const [currentAudioUs, setCurrentAudioUs] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        setCurrentAudioUk(props.vocabDetail.audioUk);
        setCurrentAudioUs(props.vocabDetail.audioUs);
        form.setFieldsValue({
            ...props.vocabDetail,
            pos: upperFirst(props.vocabDetail.pos)
        });
    }, [form, props.vocabDetail]);

    const onSubmit = async (values) => {
        const audioUs = currentAudioUs !== values?.audioUs
            ? await getAudioUpload(values?.audioUs?.file)
            : currentAudioUs;

        const audioUk = currentAudioUk !== values?.audioUk
            ? await getAudioUpload(values?.audioUk?.file)
            : currentAudioUk;

        const data = {
            ...values,
            audioUs: audioUs,
            audioUk: audioUk,
            pos: props.vocabDetail.pos.toLowerCase()
        };
        try {
            await updateDefaultVocab(props.vocabDetail.id, data);
            props.notification('success', 'edit')
            props.handleEditForm();
        } catch (e) {
            props.notification('error', 'edit')
        }
        handleShowSubmitModal();
        props.handleShow();
    };

    const propsUpload = {
        action: "https://run.mocky.io/v3/183997c2-99cf-4351-9bcd-ee5d7d34fe0c",
        maxCount: 1,
        accept: "audio/* ",
        beforeUpload: (file) => {
            const isAudio = file.type.startWith("audio/");
            if (!isAudio) {
                message.error("Not a audio file!");
            }
            return isAudio || Upload.LIST_IGNORE;
        },
    };
    const handleCancel = () => {
        props.handleShow();
    }
    const handleShowSubmitModal = () => {
        setIsSubmit(!isSubmit);
    }
    return (
        <>
            <Modal
                open={props.isOpen}
                onCancel={handleCancel}
                footer={false}
                width={550}
                style={{top: 30}}
            >
                <Space className="custom-word__wrap">
                    <Form
                        name="custom_word"
                        layout="vertical"
                        onFinish={onSubmit}
                        style={{
                            width: "100%",
                        }}
                        form={form}
                        className="custom-word__form"
                    >
                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item
                                    name="word"
                                    label="Input Word"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your word!",
                                        },
                                    ]}
                                    required
                                >
                                    <Input type="text" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="pos"
                                    label="Part of speech"
                                    placeholder="Part of speech"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input type="text" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Space style={{width: "100%"}} size={"large"}>
                            <Form.Item name="phoneUs" label="Phone US">
                                <Input type="text" placeholder="Write here"/>
                            </Form.Item>
                            {currentAudioUs
                                ?
                                <BiSolidVolumeFull
                                    size={22}
                                    style={{cursor: "pointer"}}
                                    onClick={() => {
                                        new Audio(currentAudioUs).play();
                                    }}
                                />
                                : <BiSolidVolumeMute size={22} style={{opacity: 0.5}}/>}
                            <Form.Item
                                name="audioUs"
                                label="Audio Us"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Upload
                                    {...propsUpload}
                                    onChange={({file}) => {
                                        if (file.status === "error") {
                                            return {...file, status: "error"};
                                        }

                                        if (file.status === "removed") {
                                            return undefined;
                                        }
                                        if (file.status === "done") {
                                            return {...file, status: "done"};
                                        }
                                        setCurrentAudioUs(URL.createObjectURL(file));
                                        return file;
                                    }}
                                    className="form__upload"
                                    onRemove={() => form.setFieldsValue({audioUs: undefined})}
                                >
                                    <Button className="form__upload__btn" icon={<UploadOutlined/>}>
                                        Upload
                                    </Button>
                                </Upload>
                            </Form.Item>

                        </Space>
                        <Space style={{width: "100%"}} size={"large"}>
                            <Form.Item name="phoneUk" label="Phone UK">
                                <Input
                                    type="text"
                                    placeholder="Write here"/>
                            </Form.Item>
                            {currentAudioUk
                                ?
                                <BiSolidVolumeFull
                                    size={22}
                                    style={{cursor: "pointer"}}
                                    onClick={() => {
                                        new Audio(currentAudioUk).play();
                                    }}
                                />
                                : <BiSolidVolumeMute size={22} style={{opacity: 0.5}}/>}
                            <Form.Item
                                name="audioUk"
                                label="Audio Uk"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Upload
                                    {...propsUpload}
                                    onChange={({file}) => {
                                        if (file.status === "error") {
                                            return {...file, status: "error"};
                                        }

                                        if (file.status === "removed") {
                                            return undefined;
                                        }
                                        if (file.status === "done") {
                                            return {...file, status: "done"};
                                        }
                                        setCurrentAudioUk(URL.createObjectURL(file));
                                        return file;
                                    }}
                                    className="form__upload"
                                    onRemove={() => form.setFieldsValue({audioUk: undefined})}
                                >
                                    <Button className="form__upload__btn" icon={<UploadOutlined/>}>
                                        Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Space>

                        <Form.List name="definitions">
                            {(fields, {add, remove}) => (
                                <div
                                    style={{
                                        display: "flex",
                                        rowGap: 16,
                                        flexDirection: "column",
                                    }}
                                >
                                    {fields.map(({key, name, ...restField}) => (
                                        <Card
                                            size="small"
                                            style={{border: "1px solid #ccc"}}
                                            title={`Definition ${name + 1}`}
                                            key={key}
                                            extra={
                                                fields.length > 1 && (
                                                    <CloseOutlined
                                                        style={{cursor: "pointer", color: "red", fontSize: "16px"}}
                                                        onClick={() => {
                                                            remove(name);
                                                        }}
                                                    ></CloseOutlined>

                                                )
                                            }
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, "wordDesc"]}
                                                label="Definition"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please input your definition!",
                                                    },
                                                ]}
                                            >
                                                <Input type="text" placeholder="Write here..."/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "examples"]}
                                                label="Example"
                                            >
                                                <Input type="text" placeholder="Write here..."/>
                                            </Form.Item>
                                        </Card>
                                    ))}
                                    <Button
                                        type="default"
                                        style={{color: "#4096ff", borderColor: "#4096ff"}}
                                        onClick={() => add()}
                                        block>
                                        <span style={{fontSize: "15px", fontWeight: "500"}}>+ Add definition</span>
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                        <Space style={{marginTop: "30px"}}>
                            <Button type="primary" onClick={handleShowSubmitModal}>
                                Submit
                            </Button>
                            <Button onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form>
                </Space>
                <Modal
                    centered
                    title="Are you sure about these changes?"
                    open={isSubmit}
                    onOk={form.submit}
                    onCancel={handleShowSubmitModal}>
                </Modal>
            </Modal>

        </>

    );
};

export default EditDefaultVocabularyModal;
