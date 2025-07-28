import { TransferComponent } from 'protolib/lib/transferComponent';
import { UsersView } from '@extensions/users/adminPages';
import { ServicesView } from '@extensions/services/adminPages';
import { PieChart } from 'protolib/components/PieChart';
import { BarChart } from 'protolib/components/BarChart';
import { LineChart } from 'protolib/components/LineChart';
import { AreaChart } from 'protolib/components/AreaChart';
import { RadarChart } from 'protolib/components/RadarChart';
import { Markdown } from 'protolib/components/Markdown';
import { RadialBarChart } from 'protolib/components/RadialBartChart';
import { KeySetter } from 'protolib/components/KeySetter';
import { InteractiveIcon } from 'protolib/components/InteractiveIcon';
import CanvasDraw from "react-canvas-draw"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { API, ProtoModel } from 'protobase';
import { FileBrowser } from 'protolib/adminpanel/next/components/FileBrowser';
import { Button, Spinner, XStack, YStack, Text, View } from '@my/ui'
import { ViewList } from 'protolib/components/ViewList';
import { ViewObject } from 'protolib/components/ViewObject';
import { JSONView } from 'protolib/components/JSONView';
import { ProtoThemeProvider } from 'protolib/components/ProtoThemeProvider';
import { CameraPreview } from 'protolib/components/vision/CameraPreview';
import { CameraCard } from 'protolib/components/vision/CameraCard';
import { ActionCard, ParamsForm, Icon } from 'protolib/components/board/ActionCard';
import { CardValue } from 'protolib/components/board/CardValue';
import { Provider } from 'app/provider'
import { Tinted } from 'protolib/components/Tinted'; 
import { DataView} from 'protolib/components/DataView';
import { ObjectViewLoader } from 'protolib/components/ObjectViewLoader';
import { MqttWrapper } from 'protolib/components/MqttWrapper';

export const transferExtensionComponents = () => {
    TransferComponent(XStack, 'XStack');
    TransferComponent(YStack, 'YStack');
    TransferComponent(UsersView, 'UsersView');
    TransferComponent(ServicesView, 'ServicesView');
    TransferComponent(PieChart, 'PieChart');
    TransferComponent(BarChart, 'BarChart');
    TransferComponent(LineChart, 'LineChart');
    TransferComponent(AreaChart, 'AreaChart');
    TransferComponent(RadarChart, 'RadarChart');
    TransferComponent(RadialBarChart, 'RadialBarChart');
    TransferComponent(KeySetter, 'KeySetter');
    TransferComponent(InteractiveIcon, 'InteractiveIcon');
    TransferComponent(CanvasDraw, 'CanvasDraw');
    TransferComponent(Markdown, 'Markdown');
    TransferComponent(ReactMarkdown, 'ReactMarkdown');
    TransferComponent(remarkGfm, 'remarkGfm')
    TransferComponent(API, 'API');
    TransferComponent(FileBrowser, 'FileBrowser');
    TransferComponent(Spinner, 'Spinner');
    TransferComponent(ViewList, 'ViewList');
    TransferComponent(ViewObject, 'ViewObject');
    TransferComponent(JSONView, 'JSONView');
    TransferComponent(ProtoThemeProvider, 'ProtoThemeProvider');
    TransferComponent(CameraPreview, 'CameraPreview');
    TransferComponent(CameraCard, 'CameraCard');
    TransferComponent(ActionCard, 'ActionCard');
    TransferComponent(CardValue, 'CardValue');
    TransferComponent(ParamsForm, 'ParamsForm');
    TransferComponent(Icon, 'Icon');
    TransferComponent(Button, 'Button');
    TransferComponent(Text, 'Text');
    TransferComponent(View, 'View');
    TransferComponent(Provider, 'Provider');
    TransferComponent(Tinted, 'Tinted');
    TransferComponent(DataView, 'ProtoDataView');
    TransferComponent(ObjectViewLoader, 'ObjectViewLoader');
    TransferComponent(API, 'API');
    TransferComponent(ProtoModel, 'ProtoModel');
    TransferComponent(MqttWrapper, 'MqttWrapper');
}



