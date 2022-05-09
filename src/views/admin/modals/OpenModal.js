import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import UploadCSVModal from './UploadCSVModal';

export default function NestedModal(text) {
    const { value } = text;
    let modal = null;

    if (value === 'Criar') {
        modal = CreateModal();
    } else if (value === 'Atualizar') {
        modal = UpdateModal();
    } else if (value === 'Deletar') {
        modal = DeleteModal();
    } else {
        modal = UploadCSVModal();
    }

    return modal;
}
