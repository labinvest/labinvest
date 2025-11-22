import { NextRequest, NextResponse } from 'next/server';

interface Cliente {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataNascimento: string;
    estadoCivil: string;
    profissao: string;
    rendaMensal: string;
    cep: string;
    cidade: string;
    estado: string;
    objetivoFinanceiro: string;
    comoConheceu: string;
    descricao: string;
    imagemUrl?: string;
    dataCadastro: string;
}

// Mock database - compartilhado com route.ts principal
let MOCK_CLIENTES: Cliente[] = [
    {
        id: '1',
        nome: 'João',
        sobrenome: 'Silva',
        email: 'joao.silva@email.com',
        telefone: '11987654321',
        cpf: '12345678901',
        dataNascimento: '1985-05-15',
        estadoCivil: 'casado',
        profissao: 'Engenheiro',
        rendaMensal: '5000_10000',
        cep: '01310100',
        cidade: 'São Paulo',
        estado: 'SP',
        objetivoFinanceiro: 'investimento',
        comoConheceu: 'google',
        descricao: 'Quero começar a investir para o futuro da minha família',
        dataCadastro: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        nome: 'Maria',
        sobrenome: 'Santos',
        email: 'maria.santos@email.com',
        telefone: '11912345678',
        cpf: '98765432109',
        dataNascimento: '1990-08-22',
        estadoCivil: 'solteiro',
        profissao: 'Professora',
        rendaMensal: '2000_5000',
        cep: '04567000',
        cidade: 'São Paulo',
        estado: 'SP',
        objetivoFinanceiro: 'economia',
        comoConheceu: 'indicacao',
        descricao: 'Preciso de ajuda para organizar minhas finanças e economizar',
        dataCadastro: '2024-02-20T14:30:00Z'
    }
];

// GET - Buscar cliente por ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const cliente = MOCK_CLIENTES.find(c => c.id === id);
        
        if (!cliente) {
            return NextResponse.json(
                { error: 'Cliente não encontrado' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(cliente);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar cliente' },
            { status: 500 }
        );
    }
}

// PUT - Atualizar cliente
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        
        const index = MOCK_CLIENTES.findIndex(c => c.id === id);
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Cliente não encontrado' },
                { status: 404 }
            );
        }
        
        // Verificar se email ou CPF já existem em outro cliente
        const emailExiste = MOCK_CLIENTES.some(c => c.email === body.email && c.id !== id);
        const cpfExiste = MOCK_CLIENTES.some(c => c.cpf === body.cpf && c.id !== id);
        
        if (emailExiste) {
            return NextResponse.json(
                { error: 'Email já cadastrado para outro cliente' },
                { status: 400 }
            );
        }
        
        if (cpfExiste) {
            return NextResponse.json(
                { error: 'CPF já cadastrado para outro cliente' },
                { status: 400 }
            );
        }
        
        // Atualizar cliente mantendo data de cadastro original
        MOCK_CLIENTES[index] = {
            ...body,
            id,
            dataCadastro: MOCK_CLIENTES[index].dataCadastro
        };
        
        return NextResponse.json({
            message: 'Cliente atualizado com sucesso!',
            cliente: MOCK_CLIENTES[index]
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao atualizar cliente' },
            { status: 500 }
        );
    }
}

// DELETE - Remover cliente
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const index = MOCK_CLIENTES.findIndex(c => c.id === id);
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Cliente não encontrado' },
                { status: 404 }
            );
        }
        
        MOCK_CLIENTES.splice(index, 1);
        
        return NextResponse.json({
            message: 'Cliente removido com sucesso!'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao remover cliente' },
            { status: 500 }
        );
    }
}
