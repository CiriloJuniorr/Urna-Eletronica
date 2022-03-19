﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace validacao_cpf.Controllers
{
    [ApiController]

    public class ValidarController : ControllerBase
    {
        public ValidarController()
        {

        }

        /// <summary>
        /// EndPoint para validação de CPF.
        /// </summary>
        /// <param name="cpf">CPF para ser validado</param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [Route("api/validar")]
        public async Task<ActionResult<bool>> Get([FromQuery] string cpf)
        {
            if (string.IsNullOrEmpty(cpf))
                return BadRequest(false);

            var result = IsCpf(cpf);

            if (!result)
                return BadRequest("false");

            return Ok(result);
        }

        /// <summary>
        /// Método para validação de CPF
        /// Fonte: https://desenvolvedor.ninja/dica-validacao-de-cpf-e-cnpj-no-c/
        /// </summary>
        /// <param name="cpf"></param>
        /// <returns></returns>
        private static bool IsCpf(string cpf)
        {
            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            cpf = cpf.Trim().Replace(".", "").Replace("-", "");
            if (cpf.Length != 11) //Se o CPF não tiver 11 dígitos, ele trás a mensagem de CPF inválido!
                return false;

            for (int j = 0; j < 10; j++)
                if (j.ToString().PadLeft(11, char.Parse(j.ToString())) == cpf)
                    return false;

            string tempCpf = cpf.Substring(0, 9);
            int soma = 0;

            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];

            int resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            string digito = resto.ToString();
            tempCpf = tempCpf + digito;
            soma = 0;
            for (int i = 0; i < 10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];

            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = digito + resto.ToString();

            return cpf.EndsWith(digito);
        }
    }
}
